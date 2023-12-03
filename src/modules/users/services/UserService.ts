// UserService.ts
import { IUser } from '../models/Users';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    }

    async createUser(user: IUser): Promise<IUser> {
        return this.userRepository.create(user);
    }

    async updateUser(id: string, user: IUser): Promise<IUser | null> {
        return this.userRepository.update(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }
}
