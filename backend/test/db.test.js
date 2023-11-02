const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path accordingly
const expect = chai.expect;

describe('Database Connection', () => {

    let mongooseConnectStub;

    afterEach(() => {
        // Restore the stub after each test
        mongooseConnectStub.restore();
    });

    it('should connect to the database successfully', async () => {
        mongooseConnectStub = sinon.stub(mongoose, 'connect').resolves();

        let consoleLogSpy = sinon.spy(console, 'log');
        await connectDB();

        expect(consoleLogSpy.calledOnceWith('MongoDB Connected...')).to.be.true;

        consoleLogSpy.restore();
    });
});
