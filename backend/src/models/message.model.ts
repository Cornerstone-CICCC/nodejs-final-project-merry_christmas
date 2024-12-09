import mongoose, { Types } from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        fromUserId: { type: Types.ObjectId, required: true },
        username: { type: String, required: true },
        message: { type: String, required: true },
        tree: { type: String, required: true },
    },
    { timestamps: true }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
