import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import {imageMulter} from "../middleware/imageMulter.middleware.js";
import { addProfile } from "../controllers/profile.controller.js";


const profileRouter = Router()
const uploadProfile = imageMulter(5,["image/jpeg","image/png","image/jpg"])


profileRouter.route("/add-profile").post(authMiddleWare,uploadProfile.single("image"), addProfile);



export default profileRouter