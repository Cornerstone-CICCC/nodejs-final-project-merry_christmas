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
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.MessageModel.find().sort({ createAt: -1 });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: `Error to fetch messages...` });
    }
});
const getMessagesByTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedTree = req.params.tree;
        const selectedMessages = yield message_model_1.MessageModel.find({ tree: selectedTree });
        res.status(200).json(selectedMessages);
    }
    catch (error) {
        res.status(500).json({ error: `Error to fetch message from the selected Tree.` });
    }
});
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const selectedMessage = yield message_model_1.MessageModel.findByIdAndDelete({ messageId });
        res.status(200).json({ message: 'delete message successfully!', selectedMessage });
    }
    catch (error) {
        res.status(500).json({ error: `Error to edit message.` });
    }
});
const editMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.messageId;
        const selectedMessage = yield message_model_1.MessageModel.findByIdAndUpdate({ messageId });
        res.status(200).json({ message: 'Edit message successfully!', selectedMessage });
    }
    catch (error) {
        res.status(500).json({ error: `Error to delete message.` });
    }
});
const deleteTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedTree = req.params.tree;
        const selectedMessages = yield message_model_1.MessageModel.deleteMany({ tree: selectedTree });
    }
    catch (error) {
        res.status(500).json({ error: `Error to delete tree.` });
    }
});
exports.default = {
    getAllMessages,
    getMessagesByTree,
    editMessage,
    deleteMessage,
    deleteTree
};
