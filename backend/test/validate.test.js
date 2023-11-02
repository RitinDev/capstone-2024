const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust to your server path
const expect = chai.expect;

chai.use(chaiHttp);

describe('Validation API', () => {

    const userId = '651dc5670ce39f3ffe3bb45b'; // Replace with a valid user ID
    const questionId = '6542f009f81ec8ee71e5abed';
    const answerId = '6542f07712953bcded38a4b2';

    describe('POST /question/:questionId', () => {
        it('should validate a question successfully', (done) => {
            chai.request(server)
                .post(`/validate/question/${questionId}`)
                .send({ userId: userId, questionId: questionId })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Question validated successfully!');
                    done();
                });
        });

        it('should not allow a user to validate a question twice', (done) => {
            chai.request(server)
                .post(`/validate/question/${questionId}`)
                .send({ userId })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'User already validated this question.');
                    done();
                });
        });

        it('should return an error for invalid user or question', (done) => {
            const invalidId = '123456789012345678901234'; // Mock invalid ID
            chai.request(server)
                .post(`/validate/question/${invalidId}`)
                .send({ userId: invalidId })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'User or Question not found.');
                    done();
                });
        });
    });

    describe('POST /answer/:answerId', () => {
        it('should validate an answer successfully', (done) => {
            chai.request(server)
                .post(`/validate/answer/${answerId}`)
                .send({ userId })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Answer validated successfully!');
                    done();
                });
        });

        it('should not allow a user to validate an answer twice', (done) => {
            chai.request(server)
                .post(`/validate/answer/${answerId}`)
                .send({ userId })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'User already validated this answer.');
                    done();
                });
        });

        it('should return an error for invalid user or answer', (done) => {
            const invalidId = '123456789012345678901234'; // Mock invalid ID
            chai.request(server)
                .post(`/validate/answer/${invalidId}`)
                .send({ userId: invalidId })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'User or Answer not found.');
                    done();
                });
        });
    });
});
