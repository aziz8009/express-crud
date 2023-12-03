// UserRepository.ts
import User, { IUser } from '../models/Users';

export class UserRepository {
    async findAll(): Promise<IUser[]> {
        return User.find().exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    async create(user: IUser): Promise<IUser> {
        return User.create(user);
    }

    async update(id: string, user: IUser): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id).exec();
    }
}
