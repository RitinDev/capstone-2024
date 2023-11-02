const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

const randomEmail = Math.random().toString(36).substring(2, 15) + '@test.com';

describe('Users API', () => {

    // Testing the POST /signup endpoint
    describe('POST /signup', () => {

        it('should register a new user', (done) => {
            chai.request(server)
                .post('/api/users/signup')
                .send({ email: `${randomEmail}`, password: 'password123', firstName: 'John', lastName: 'Doe' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('should not register a user with an existing email', (done) => {
            chai.request(server)
                .post('/api/users/signup')
                .send({ email: `${randomEmail}`, password: 'password123', firstName: 'John', lastName: 'Doe' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('msg', 'User already exists');
                    done();
                });
        });

        it('should not register a user with invalid email', (done) => {
            chai.request(server)
                .post('/api/users/signup')
                .send({ email: 'invalidEmail', password: 'password123', firstName: 'John', lastName: 'Doe' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

    });

    // Testing the POST /login endpoint
    describe('POST /login', () => {

        it('should authenticate the user and return token', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({ email: `${randomEmail}`, password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('userID');
                    done();
                });
        });

        it('should not authenticate with wrong password', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({ email: 'test@test.com', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('msg', 'Invalid credentials');
                    done();
                });
        });

        it('should not authenticate with non-existing email', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({ email: 'notexist@test.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('msg', 'Invalid credentials');
                    done();
                });
        });

        after(async () => {
            const User = require('../models/User'); // Adjust the path to your User model

            try {
                await User.findOneAndDelete({ email: randomEmail });

                // Optional: If you want to disconnect after tests
                // mongoose.disconnect();
            } catch (err) {
                console.error('Error during cleanup:', err);
            }
        });

    });
});
