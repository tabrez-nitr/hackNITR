import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/register").post(upload.single("profile"),registerUser)
userRouter.route("/login").post(upload.none(),loginUser);
userRouter.route("/logout").post(verifyJWT,logoutUser);


export {userRouter};