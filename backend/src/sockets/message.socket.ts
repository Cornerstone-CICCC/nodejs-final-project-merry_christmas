import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message.model";


const socket = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        //connect
        console.log(`User Connected:${socket.id}`)

        //addMessage event
        socket.on('addMessage', async (data) => {
            const { fromUserId, message, tree } = data
            try {
                const newMessage = new MessageModel({ fromUserId, message, tree })
                await newMessage.save()
                io.emit('newMessage', newMessage)
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