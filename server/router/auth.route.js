import { Router } from "express";
import {LoginUser,logoutUser,refreshToken,registerUser, googleAuthCallback } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import LoginUserSchema from "../schemas/LoginUser.js";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js"
// import {passport} from "../config/passport.js"

const authRouter = Router();


authRouter.route('/register').post(validate(registerUserSchema),registerUser);
authRouter.route('/login').post(validate(LoginUserSchema), LoginUser)
authRouter.route('/refresh-token').post(refreshToken)
authRouter.route('/logout').get(authMiddleWare, logoutUser)


// here we will setup the routes for the google oauth,
//1. /api/v1/auth/google
// authRouter.route("/google").get(passport.authenticate("google" , {scope: ["email" , "profile"] , prompt:"consent"}));

//2. /api/v1/auth/google/callback
// authRouter.route("/google/callback").get(passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:5173/auth/failure"
// }), googleAuthCallback )







export default authRouter;