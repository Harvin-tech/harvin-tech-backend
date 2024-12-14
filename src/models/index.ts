import { model } from 'mongoose';
import { userSchema } from './user.model';

export const Url = model('url', userSchema);
