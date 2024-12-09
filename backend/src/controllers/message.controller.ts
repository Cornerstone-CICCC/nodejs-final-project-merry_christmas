import { Request, Response } from "express";
import { MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";

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

const deleteMessage = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const messageId = req.params.id
        const selectedMessage = await MessageModel.findByIdAndDelete(messageId)
        if(!selectedMessage){
            console.log('message does not exist')
            res.status(404).json({ error: 'Message does not exist' })
            return
        }
        res.status(200).json({ message: 'delete message successfully!' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: `Error to delete message.` })
    }
}

const editMessage = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const messageId = req.params.id
        const message = req.body
        const selectedMessage = await MessageModel.findByIdAndUpdate(messageId, { message }, { new: true })
        if(!selectedMessage){
            console.log('message does not exist')
            res.status(404).json({ error: 'Message does not exist' })
            return
        }
        res.status(200).json({ message: 'Edit message successfully!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: `Error to edit message.` })
    }
}

const deleteTree = async (req: Request<{ tree: string }>, res: Response) => {
    try {
        const selectedTree = req.params.tree
        const selectedMessages = await MessageModel.deleteMany({ tree: selectedTree })
        res.status(200).json({ message: 'Deleted successfully' })
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