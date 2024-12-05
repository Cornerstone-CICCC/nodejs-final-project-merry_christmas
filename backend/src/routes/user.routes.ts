import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/middleware";


const userRouter = Router()

userRouter.post('/login', userController.userLogin);
userRouter.post('/register', userController.userRegister)
userRouter.get('/logout', userController.userLogout);
userRouter.get('/profile', userController.userProfile);


export default userRouter