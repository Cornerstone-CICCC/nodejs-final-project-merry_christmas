import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
    fromUserId: object;
    message: string;
    tree: string;
}

const MessageSchema = new mongoose.Schema(
    {
        fromUserId: { type: Types.ObjectId, required: true, ref: 'User' },
        message: { type: String, required: true },
        tree: { type: String, required: true },
    },
    { timestamps: true }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
