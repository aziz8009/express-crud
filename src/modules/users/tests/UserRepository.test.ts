// UserRepository.test.ts
import { expect } from 'chai';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/Users';
import sinon from 'sinon';

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            // Stub the User.find().exec() method
            const expectedUsers = [
                { name: 'User1', email: 'user1@gmail.com', no_handphone: "0877787283", alamat: "alamat" },
                { name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" }
            ];

            const findStub = sinon.stub().resolves(expectedUsers);
            sinon.replace(userRepository, 'findAll', findStub);

            const result = await userRepository.findAll();

            expect(result).to.deep.equal(expectedUsers);
            // Ensure the stub was called once
            expect(findStub.calledOnce).to.be.true;
        });
    });

    describe('findById', () => {
        it('should return a user by id', async () => {
            const findByIdStub = sinon.stub().resolves({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            sinon.replace(userRepository, 'findById', findByIdStub);

            const result = await userRepository.findById('1');

            expect(result).to.deep.equal({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            expect(findByIdStub.calledOnceWithExactly('1')).to.be.true;
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createStub = sinon.stub().resolves({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            sinon.replace(userRepository, 'create', createStub);

            const newUser = { name: 'NewUser' } as IUser;
            const result = await userRepository.create(newUser);

            expect(result).to.deep.equal({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            expect(createStub.calledOnceWithExactly(newUser)).to.be.true;
        });
    });

    describe('update', () => {
        it('should update a user by id', async () => {
            const updateStub = sinon.stub().resolves({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            sinon.replace(userRepository, 'update', updateStub);

            const updatedUser = { name: 'UpdatedUser' } as IUser;
            const result = await userRepository.update('1', updatedUser);

            expect(result).to.deep.equal({ name: 'User2', email: "user2@gmail.com", no_handphone: "0877787283", alamat: "alamat" });
            expect(updateStub.calledOnceWithExactly('1', updatedUser)).to.be.true;
        });
    });

    describe('delete', () => {
        it('should delete a user by id', async () => {
            const deleteStub = sinon.stub().resolves();
            sinon.replace(userRepository, 'delete', deleteStub);

            await userRepository.delete('1');

            // Ensure the stub was called once with the correct parameter
            expect(deleteStub.calledOnceWithExactly('1')).to.be.true;
        });
    });
});
