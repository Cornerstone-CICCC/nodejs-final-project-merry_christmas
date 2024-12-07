import { Request, Response } from "express";
import { MessageModel } from "../models/message.model";

const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await MessageModel.find().sort({ createAt: -1 })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ error: `Error to fetch messages...` })
    }
}


const getMessagesByTree = async (req: Request<{ tree: string }>, res: Response) => {
    try {
        const selectedTree = req.params.tree
        const selectedMessages = await MessageModel.find({ tree: selectedTree })

        res.status(200).json(selectedMessages)
    } catch (error) {
        res.status(500).json({ error: `Error to fetch message from the selected Tree.` })
    }
}

const editMessage = async (req: Request<{ messageId: string }>, res: Response) => {
    try {
        const messageId = req.params.messageId
        const selectedMessage = await MessageModel.findByIdAndDelete({ messageId })
        res.status(200).json({ message: 'delete message successfully!', selectedMessage })

    } catch (error) {
        res.status(500).json({ error: `Error to edit message.` })
    }
}

const deleteMessage = async (req: Request<{ messageId: string }>, res: Response) => {
    try {
        const messageId = req.params.messageId
        const selectedMessage = await MessageModel.findByIdAndUpdate({ messageId })
        res.status(200).json({ message: 'Edit message successfully!', selectedMessage })
    } catch (error) {
        res.status(500).json({ error: `Error to delete message.` })
    }
}

const deleteTree = async (req: Request<{ tree: string }>, res: Response) => {
    try {
        const selectedTree = req.params.tree
        const selectedMessages = await MessageModel.deleteMany({ tree: selectedTree })

    } catch (error) {
        res.status(500).json({ error: `Error to delete tree.` })
    }
}


export default {
    getAllMessages,
    getMessagesByTree,
    editMessage,
    deleteMessage,
    deleteTree
}