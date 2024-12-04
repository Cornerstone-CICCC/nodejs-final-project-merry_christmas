import { Server, Socket } from "socket.io";


const setupTreeSocket = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        //connect
        console.log(`User Connected:${socket.id}`)




        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`)
        })
    })
}

export default setupTreeSocket