import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerUser } from "../controllers/user.controllers.js";

const userRouter = Router();


userRouter.route("/register").post(upload.single("profile"),registerUser)


export {userRouter};