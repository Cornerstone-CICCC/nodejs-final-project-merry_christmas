import express from "express";
import messageController from "../controllers/message.controller";

const messageRouter = express.Router()


messageRouter.get('/', messageController.getAllMessages)
messageRouter.get('/tree/:tree', messageController.getMessagesByTree)
messageRouter.delete('/tree/:tree', messageController.deleteTree)
messageRouter.put('/update/:id', messageController.editMessage)
messageRouter.delete('/delete/:id', messageController.deleteMessage)


export default messageRouter