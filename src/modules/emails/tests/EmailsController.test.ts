// EmailsController.test.ts
import { expect } from 'chai';
import sinon from 'sinon';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Request, Response } from 'express';
import { connectToRabbitMQ } from '../../../config/rabbitmq';
import { EmailsController } from '../controllers/emailsController';

describe('EmailsController', () => {
    let emailsController: EmailsController;
    let sandbox: any;

    let connectToRabbitMQStub: sinon.SinonStub;
    beforeEach(() => {
        emailsController = new EmailsController();
        sandbox = sinon.createSandbox();
        connectToRabbitMQStub = sinon.stub();
    });

    afterEach(() => {
        // Restore the sandbox to make sure the spies/stubs are removed
        sandbox.restore();
    });

    describe('sendEmail', () => {
        it('should send an email successfully', async () => {
            // Mock the request and response objects
            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const mockRequest = {
                body: {
                    to: 'test@example.com',
                    subject: 'Test Subject',
                    message: 'Test Message',
                },
            } as Request;
            const mockResponse: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Email sent successfully',
                    status: true,
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            // Stub the connectToRabbitMQ function
            connectToRabbitMQStub.resolves({ channel: { sendToQueue: (queue: string, message: Buffer) => { } } });

            // Replace the actual connectToRabbitMQ with the stub
            const originalConnectToRabbitMQ = connectToRabbitMQ;
            (connectToRabbitMQ as any) = connectToRabbitMQStub;

            // Perform the action
            await emailsController.sendEmail(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWithExactly({
                message: 'Email sent successfully',
                status: true,
            })).to.be.true;

            // Restore the original connectToRabbitMQ function
            (connectToRabbitMQ as any) = originalConnectToRabbitMQ;
        });


        it('should handle missing parameters', async () => {
            // Mock the request and response objects
            const mockRequest = { body: {} } as Request;
            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const mockResponse: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Missing required parameters',
                    status: false,
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            // Perform the action
            await emailsController.sendEmail(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.status.calledWith(400)).to.be.true;
            expect(mockResponse.json.calledWithExactly({
                message: 'Missing required parameters',
                status: false
            }));
        });

        it('should handle internal server error', async () => {
            // Mock the request and response objects
            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const mockRequest = {
                body: {
                    to: 'test@example.com',
                    subject: 'Test Subject',
                    message: 'Test Message',
                },
            } as Request;
            const mockResponse: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Internal Server Error',
                    status: false,
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            // Stub the connectToRabbitMQ function
            connectToRabbitMQStub.rejects(new Error('Internal Server Error'));

            // Replace the actual connectToRabbitMQ with the stub
            const originalConnectToRabbitMQ = connectToRabbitMQ;
            (connectToRabbitMQ as any) = connectToRabbitMQStub;

            // Perform the action
            await emailsController.sendEmail(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.status.calledWith(500)).to.be.true; // Corrected status code
            expect(mockResponse.json.calledWithExactly({
                message: 'Internal Server Error',
                status: false,
            })).to.be.true;

            // Restore the original connectToRabbitMQ function
            (connectToRabbitMQ as any) = originalConnectToRabbitMQ;
        });

    });
});
