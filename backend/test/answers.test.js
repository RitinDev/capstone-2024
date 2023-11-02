const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js'); // adjust the path to your server file
const should = chai.should();

chai.use(chaiHttp);

describe('Answers API', () => {
    let jwtToken;

    before((done) => {
        chai.request(server)
            .post('/api/users/login')
            .send({
                email: 'test@gmail.com', // Your test user's email
                password: 'test123'    // Your test user's password
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                jwtToken = res.body.token; // Save the JWT token for use in tests
                done();
            });
    });

    describe('POST /api/answers', () => {
        it('should submit an answer to a specific question', (done) => {
            chai.request(server)
                .post('/api/answers')
                .set('x-auth-token', jwtToken)
                .send({
                    content: '42 is the answer!',
                    associatedQuestion: '6542eb8c5a6afb759fb331c7' // The question's _id you provided
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('content');
                    res.body.content.should.be.eql('42 is the answer!');
                    done();
                });
        });
    });

    describe('GET /api/answers/random', () => {
        it('should get a random answer based on the associated question', (done) => {
            chai.request(server)
                .get('/api/answers/random')
                .query({ questionId: '6542eb8c5a6afb759fb331c7' }) // Using query string
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('content');
                    done();
                });
        });
    });

    describe('GET /api/answers/:id', () => {
        it('should retrieve an answer and its associated question', (done) => {
            // This is a generic test. You would want to adjust the answer's ID here:
            const answerId = '651df2478a0926e71a99745b';
            chai.request(server)
                .get('/api/answers/' + answerId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('content');
                    res.body.should.have.property('associatedQuestion');
                    done();
                });
        });
    });
});
