const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Questions API', () => {
    // Store JWT for authenticated routes
    let jwtToken;

    // First, obtain a valid JWT token
    before((done) => {
        chai.request(server)
            .post('/api/users/login')
            .send({
                email: 'test@gmail.com',
                password: 'test123'
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                jwtToken = res.body.token;
                done();
            });
    });

    // Test for creating or getting an existing question
    describe('POST /api/questions', () => {
        it('should create a new question', (done) => {
            chai.request(server)
                .post('/api/questions')
                .set('x-auth-token', jwtToken)
                .send({ content: 'What is the meaning of life?' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('content');
                    expect(res.body.content).to.equal('What is the meaning of life?');
                    done();
                });
        });
    });

    // Test for fetching a random question
    describe('GET /api/questions/random', () => {
        it('should fetch a random question', (done) => {
            chai.request(server)
                .get('/api/questions/random')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('content');
                    done();
                });
        });
    });
});

