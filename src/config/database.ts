
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URI
const MONGO_URI = process.env.MONGODB_URI; // Replace with your actual MongoDB URI

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
