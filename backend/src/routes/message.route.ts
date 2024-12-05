import express from "express";
import messageController from "../controllers/message.controller";

const messageRouter = express.Router()


messageRouter.get('/', messageController.getAllMessages)
messageRouter.get('/tree/:tree', messageController.getMessagesByTree)
messageRouter.delete('/tree/:tree', messageController.deleteTree)
messageRouter.put('/message/:id', messageController.editMessage)
messageRouter.delete('/message/:id', messageController.deleteMessage)


export default messageRouter