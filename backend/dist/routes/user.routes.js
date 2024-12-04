"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/login', user_controller_1.default.userLogin);
userRouter.post('/register', user_controller_1.default.userRegister);
userRouter.get('/logout', user_controller_1.default.userLogout);
userRouter.get('/profile', user_controller_1.default.userProfile);
//userRouter.get('/profile', authenticateJWT>>checkAuth, userController.userProfile);
exports.default = userRouter;
