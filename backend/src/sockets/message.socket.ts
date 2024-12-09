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
            const { fromUserId, message, tree } = data
            const listenMessage = new MessageModel({ fromUserId, message, tree })
            console.log(`listenMessage! ${listenMessage}`)
            await listenMessage.save()


            try {
                const userId = new mongoose.Types.ObjectId(fromUserId);
                const user = await UserModel.findById(userId).select('username');
                if (!user) {
                    console.error('User not found');
                    return;
                }
                console.log(`found User! ${user}`)
                const fromUsername = user.username

                const showMessage = ({ fromUsername, message, tree })
                console.log(`showMessage! ${showMessage}`)

                io.emit('newMessage', showMessage)

            } catch (error) {
                console.log('Error saving Message', error)
            }
        })

        //editMessage

        //deleteMessage


        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`)
        })



    })
}

export default socket