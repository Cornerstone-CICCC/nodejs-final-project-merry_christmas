import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { UserLoginRequestBody } from "../types/user.type";
import { generateToken, verifyToken } from "../middleware/auth";
import { User } from "../types/user.type";
import bcrypt from 'bcrypt'
import userRouter from "../routes/user.routes";
import { v4 as uuidv4 } from 'uuid'



const userLogin = async (req: Request<{}, {}, Omit<User, 'userId'>>, res: Response): Promise<void> => {
    const { username, password }: UserLoginRequestBody = req.body

    if (!username || !password) {
        res.status(404).json({ message: 'Missing username or password' })
        return
    }
    const user = await UserModel.findOne({ username })
    if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(403).json({ message: 'Passwords do not match' })
        return
    }

    const token = generateToken({ userId: user.userId, username: user.username });
    await user.save();

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.json({ message: 'Login successful', user: { userId: user.userId, username: user.username } });
    return
}


const userLogout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({
        message: 'Logout successful'
    })
}

const userRegister = async (req: Request<{}, {}, Omit<User, 'userId'>>, res: Response): Promise<void> => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(404).json({ message: 'Missing username or password' })
        return
    }
    const checkUser = await UserModel.findOne({ username })
    if (checkUser) {
        res.status(409).json({ message: "Username taken" })
        return
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new UserModel({
        userId: uuidv4(),
        username,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json(newUser)
}


// Profile
const userProfile = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    const decoded = verifyToken(token);
    const myUserId = decoded?.id;

    if (!myUserId) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
    }

    const user = await UserModel.findById(myUserId).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(user);
}



export default {
    // getUserInfo,
    userRegister,
    userLogin,
    userLogout,
    userProfile
}
