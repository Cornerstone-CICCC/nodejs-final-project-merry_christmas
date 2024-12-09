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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("../models/message.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const socket = (io) => {
    io.on('connection', (socket) => {
        //connect
        console.log(`User Connected:${socket.id}`);
        //addMessage event
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { fromUserId, message, tree } = data;
            const listenMessage = new message_model_1.MessageModel({ fromUserId, message, tree });
            console.log(`listenMessage! ${listenMessage}`);
            yield listenMessage.save();
            try {
                const userId = new mongoose_1.default.Types.ObjectId(fromUserId);
                const user = yield user_model_1.UserModel.findById(userId).select('username');
                if (!user) {
                    console.error('User not found');
                    return;
                }
                console.log(`found User! ${user}`);
                const fromUsername = user.username;
                const showMessage = ({ fromUsername, message, tree });
                console.log(`showMessage! ${showMessage}`);
                io.emit('newMessage', showMessage);
            }
            catch (error) {
                console.log('Error saving Message', error);
            }
        }));
        //editMessage
        //deleteMessage
        //disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnect: ${socket.id}`);
        });
    });
};
exports.default = socket;
