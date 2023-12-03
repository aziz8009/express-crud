// UserController.test.ts
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { IUser } from '../models/Users';

describe('UserController', () => {


    let userRepositoryMock: sinon.SinonStubbedInstance<UserRepository>;
    let userService: UserService;
    let userController: UserController;
    let sandbox: any;
    let userServiceStub: sinon.SinonStub;;
    beforeEach(() => {
        //mockUserService = new UserService();
        // Create a mock instance of UserRepository
        userRepositoryMock = sinon.createStubInstance(UserRepository);
        // Inject the mock instance into UserService
        userService = new UserService(userRepositoryMock);
        userController = new UserController(userService);

        sandbox = sinon.createSandbox();


    });

    describe('getAllUsers', () => {

        it('should return a list of users', async () => {

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const req = {} as Request;
            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengambil data users',
                    status: true,
                    data: [{ name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }, { name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" }]
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            await userController.getAllUsers(req as Request, res as Response);

            expect(res.json.calledOnce).to.be.true;
        });

        it('should return a list of users with error', async () => {

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengambil data users',
                    status: true,
                    data: [{ name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }, { name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" }]
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            const req = {} as Request;

            const errorMessage = 'Failed to get users';
            userServiceStub = sinon.stub(UserService.prototype, 'getAllUsers').rejects(new Error(errorMessage));

            // Act
            await userController.getAllUsers(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ status: false, message: errorMessage, data: null })).to.be.true;

        });
    });

    describe('getUserById', () => {
        it('should return a user by id', async () => {

            const req: Partial<Request> = { params: { id: '1' } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengambil data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            await userController.getUserById(req as Request, res as Response);

            expect(res.json.calledOnce).to.be.true;

        });

        it('should return a user by id with error', async () => {

            const req: Partial<Request> = { params: { id: '1' } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengambil data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            const errorMessage = 'Failed to get users';
            userServiceStub = sinon.stub(UserService.prototype, 'getUserById').rejects(new Error(errorMessage));

            await userController.getUserById(req as Request, res as Response);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ status: false, message: errorMessage, data: null })).to.be.true;

        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {

            const req: Partial<Request> = { body: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, menambah data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            await userController.createUser(req as Request, res as Response);

            // expect(res.status).to.be.calledWith(201);
            expect(res.json.calledOnce).to.be.true;

        });

        it('should create a new user with error', async () => {

            const req: Partial<Request> = { body: { name: '', email: '', no_handphone: "0877787283", alamat: "alamat" } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, menambah data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;


            const errorMessage = 'Failed to create users';
            userServiceStub = sinon.stub(UserService.prototype, 'createUser').rejects(new Error(errorMessage));

            await userController.createUser(req as Request, res as Response);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ status: false, message: errorMessage, data: null })).to.be.true;
        });
    });

    describe('updateUser', () => {
        it('should update a user by id', async () => {

            const req: Partial<Request> = { params: { id: '1' }, body: { name: 'UpdatedUser' } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengubah data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            await userController.updateUser(req as Request, res as Response);

            expect(res.json.calledOnce).to.be.true;
        });

        it('should update a user by id with error', async () => {

            const req: Partial<Request> = { params: { id: '1' }, body: { name: 'UpdatedUser' } };

            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, mengubah data users',
                    status: true,
                    data: { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" }
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            const errorMessage = 'Failed to update users';
            userServiceStub = sinon.stub(UserService.prototype, 'updateUser').rejects(new Error(errorMessage));

            await userController.updateUser(req as Request, res as Response);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ status: false, message: errorMessage, data: null })).to.be.true;
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by id', async () => {
            const req: Partial<Request> = { params: { id: '1' } };
            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, menghapus data users',
                    status: true,
                    data: null
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            await userController.deleteUser(req as Request, res as Response);

            expect(res.json.calledOnce).to.be.true;
        });

        it('should delete a user by id with error', async () => {
            const req: Partial<Request> = { params: { id: '1' } };
            type MockResponse = {
                status: sinon.SinonStub<any[], any>;
                json: sinon.SinonStub<any[], any>;
            } & Response;

            const res: MockResponse = {
                status: sandbox.stub().returnsThis() as sinon.SinonStub,
                json: sandbox.stub().returns({
                    message: 'Berhasil, menghapus data users',
                    status: true,
                    data: null
                }) as sinon.SinonStub,
                // Add any additional properties from the Response type if needed
            } as MockResponse;

            const errorMessage = 'Failed to delete users';
            userServiceStub = sinon.stub(UserService.prototype, 'deleteUser').rejects(new Error(errorMessage));

            await userController.deleteUser(req as Request, res as Response);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ status: false, message: errorMessage, data: null })).to.be.true;
        });
    });
});
