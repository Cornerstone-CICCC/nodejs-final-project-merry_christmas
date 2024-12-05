import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user.routes";
import messageRouter from "./routes/message.route";
import socket from "./sockets/message.socket";
import cookieParser from "cookie-parser";
dotenv.config()

//create
const app = express()

//middleware
app.use(cors({
    origin: 'http://localhost:4321',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Routes
app.use('/user', userRouter)
app.use('/api/msTree', messageRouter)



// Create HTTP server and attach Socket.IO
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4321',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
})



//Connect to mongoDB & Start server
const MONGO_URI = process.env.DATABASE_URL!

mongoose
    .connect(MONGO_URI, { dbName: "christmas_tree" })
    .then(() => {
        console.log('connect to MongoDB database')
        socket(io)

        const PORT = process.env.PORT || 3000
        server.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`)
        })
    })
    .catch((error) => {
        console.error(`Error connect to MongoDB: ${error}`)
    })
