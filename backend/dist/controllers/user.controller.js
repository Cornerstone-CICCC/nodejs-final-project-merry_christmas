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
const user_model_1 = require("../models/user.model");
const auth_1 = require("../middleware/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({ message: 'Missing username or password' });
        return;
    }
    const user = yield user_model_1.UserModel.findOne({ username });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(403).json({ message: 'Passwords do not match' });
        return;
    }
    const token = (0, auth_1.generateToken)({ userId: user.userId, username: user.username });
    yield user.save();
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.json({ message: 'Login successful', user: { userId: user.userId, username: user.username } });
    return;
});
const userLogout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Logout successful'
    });
};
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({ message: 'Missing username or password' });
        return;
    }
    const checkUser = yield user_model_1.UserModel.findOne({ username });
    if (checkUser) {
        res.status(409).json({ message: "Username taken" });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const newUser = new user_model_1.UserModel({
        userId: (0, uuid_1.v4)(),
        username,
        password: hashedPassword,
    });
    yield newUser.save();
    res.status(201).json(newUser);
});
// Profile
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    const decoded = (0, auth_1.verifyToken)(token);
    const myUserId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
    if (!myUserId) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
    }
    const user = yield user_model_1.UserModel.findById(myUserId).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
});
exports.default = {
    // getUserInfo,
    userRegister,
    userLogin,
    userLogout,
    userProfile
};
