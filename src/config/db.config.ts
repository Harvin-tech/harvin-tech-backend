import mongoose from 'mongoose';

export const mongoDbConnection = mongoose.connect(process.env.MONGO_URI || '');
