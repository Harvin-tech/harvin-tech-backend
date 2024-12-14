import mongoose from 'mongoose';
import { ENV } from './env';

export const mongoDbConnection = mongoose.connect(ENV.MONGO_URI);
