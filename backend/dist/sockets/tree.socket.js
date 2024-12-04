"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setupTreeSocket = (io) => {
    io.on('connection', (socket) => {
        //connect
        console.log(`User Connected:${socket.id}`);
        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`);
        });
    });
};
exports.default = setupTreeSocket;
