import Mongoose from 'mongoose';
import { UserSchema } from '../schema/Schema';

export const User = Mongoose.model('user',UserSchema);