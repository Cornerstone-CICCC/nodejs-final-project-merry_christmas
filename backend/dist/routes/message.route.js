"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const messageRouter = express_1.default.Router();
messageRouter.get('/', message_controller_1.default.getAllMessages);
messageRouter.get('/tree/:tree', message_controller_1.default.getMessagesByTree);
messageRouter.delete('/tree/:tree', message_controller_1.default.deleteTree);
messageRouter.put('/update/:id', message_controller_1.default.editMessage);
messageRouter.delete('/delete/:id', message_controller_1.default.deleteMessage);
exports.default = messageRouter;
