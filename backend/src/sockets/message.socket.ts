import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message.model";
import messageController from "../controllers/message.controller";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";


const socket = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        //connect
        console.log(`User Connected:${socket.id}`)

        //addMessage event
        socket.on('sendMessage', async (data) => {
            try {
                const { fromUserId, message, tree, username } = data
                const showMessage = new MessageModel({ fromUserId, username, message, tree })
                console.log(`listenMessage! ${showMessage}`)
                await showMessage.save()
                io.emit('newMessage', showMessage)

            } catch (error) {
                console.log('Error saving Message', error)
            }
        })

        //get & Send Message by ID
        socket.on('getMessageById', async (data) => {
            try {
                const { id } = data
                const selectedMessage = await MessageModel.findById(id)
                if (selectedMessage) {
                    socket.emit('messageById', { message: selectedMessage.message })
                }
            } catch (error) {
                console.log('Error getting Message', error)
            }
        })

        //edit Message
        socket.on('editRequestById', async (data) => {
            try {
                const { id, message } = data
                const updatedMessage = await MessageModel.findByIdAndUpdate(id, { message }, { new: true })
                if (updatedMessage) {
                    socket.emit('editComplete', updatedMessage)
                } else {
                    console.log('Message not found');
                }
            } catch (error) {
                console.log('Error editing Message', error)
            }
        })

        //delete Message
        socket.on('deleteRequest', async (data) => {
            try {
                const { id } = data
                await MessageModel.findByIdAndDelete(id)
                io.emit('deleteComplete', { id })
            } catch (error) {
                console.log('Error deleting Message', error)
            }

        })


        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`)
        })



    })
}

export default socket