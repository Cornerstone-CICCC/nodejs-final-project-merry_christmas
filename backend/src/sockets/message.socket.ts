import { Server, Socket } from "socket.io";
import { MessageModel } from "../models/message.model";


const socket = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        //connect
        console.log(`User Connected:${socket.id}`)

        //addMessage event
        socket.on('addMessage', async (data) => {
            const { fromUserId, username, message, tree } = data
            try {
                const newMessage = new MessageModel({ fromUserId, username, message, tree })
                await newMessage.save()
                io.emit('newMessage', newMessage)
            } catch (error) {
                console.log('Error saving Message', error)
            }
        })

        socket.on('join room', (data) => {
            socket.join(data.tree)

            io.to(data.tree).emit('newUserJoin', {
                username: 'System',
                message: `${data.username} joined the room ${data.tree}`,
                tree: data.tree,
            })
        })

        socket.on('leave room', (data) => {
            socket.leave(data.tree)

            io.to(data.tree).emit('userLeave', {
                username: 'System',
                tree: data.tree,
                message: `${data.username}, has left the room ${data.tree}`
            })
        })

        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`)
        })



    })
}

export default socket