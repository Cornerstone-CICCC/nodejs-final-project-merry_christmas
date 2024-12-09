"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("../models/message.model");
const socket = (io) => {
    io.on('connection', (socket) => {
        //connect
        console.log(`User Connected:${socket.id}`);
        //addMessage event
        socket.on('addMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { fromUserId, message, tree } = data;
            try {
                const newMessage = new message_model_1.MessageModel({ fromUserId, message, tree });
                yield newMessage.save();
                io.emit('newMessage', newMessage);
            }
            catch (error) {
                console.log('Error saving Message', error);
            }
        }));
        socket.on('join room', (data) => {
            socket.join(data.tree);
            io.to(data.tree).emit('newMessage', {
                username: 'System',
                message: `${data.username} joined the room ${data.tree}`,
                tree: data.tree,
            });
        });
        socket.on('leave room', (data) => {
            socket.leave(data.tree);
            io.to(data.tree).emit('newMessage', {
                username: 'System',
                tree: data.tree,
                message: `${data.username}, has left the room ${data.tree}`
            });
        });
        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`);
        });
    });
};
exports.default = socket;
