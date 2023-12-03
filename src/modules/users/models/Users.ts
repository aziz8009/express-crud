// User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    no_handphone: string;
    alamat: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    no_handphone: { type: String, required: true },
    alamat: { type: String, required: true },
});

export default mongoose.model<IUser>('users', UserSchema);
