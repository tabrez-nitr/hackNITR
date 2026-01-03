import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerUser } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/register").post(
    upload.fields([
        {
            name: "profileImage", 
            maxCount: 1
        }
    ]), 
    registerUser
);


export {userRouter};