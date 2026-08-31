import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import { changePassword, forgetPassword, me, resetPassword } from "../controllers/user.controller.js";
import validate from "../middleware/validate.js";
import changePasswordSchema from "../schemas/changePassword.js";
import forgetPasswordSchema from "../schemas/forgetPasswordSchema.js"
import resetPasswordSchema from "../schemas/resetPasswordSchema.js"


const userRouter = Router();

userRouter.route('/me').get(authMiddleWare, me);
userRouter.route('/change-password').post(validate(changePasswordSchema), authMiddleWare, changePassword );
userRouter.route('/forget-password').post(validate(forgetPasswordSchema), forgetPassword );
userRouter.route('/reset-password/:token').post(validate(resetPasswordSchema), resetPassword );




export default userRouter