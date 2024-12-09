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
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { fromUserId, message, tree, username } = data;
                const showMessage = new message_model_1.MessageModel({ fromUserId, username, message, tree });
                console.log(`listenMessage! ${showMessage}`);
                yield showMessage.save();
                io.emit('newMessage', showMessage);
            }
            catch (error) {
                console.log('Error saving Message', error);
            }
        }));
        //get & Send Message by ID
        socket.on('getMessageById', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = data;
                const selectedMessage = yield message_model_1.MessageModel.findById(id);
                if (selectedMessage) {
                    socket.emit('messageById', { message: selectedMessage.message });
                }
            }
            catch (error) {
                console.log('Error getting Message', error);
            }
        }));
        //edit Message
        socket.on('editRequestById', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, message } = data;
                const updatedMessage = yield message_model_1.MessageModel.findByIdAndUpdate(id, { message }, { new: true });
                if (updatedMessage) {
                    socket.emit('editComplete', updatedMessage);
                }
                else {
                    console.log('Message not found');
                }
            }
            catch (error) {
                console.log('Error editing Message', error);
            }
        }));
        //delete Message
        socket.on('deleteRequest', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = data;
                yield message_model_1.MessageModel.findByIdAndDelete(id);
                io.emit('deleteComplete', { id });
            }
            catch (error) {
                console.log('Error deleting Message', error);
            }
        }));
        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`);
        });
    });
};
exports.default = socket;
