import { User } from '../types/user.type'

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);
