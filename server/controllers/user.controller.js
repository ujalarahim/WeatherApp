import AsyncHandler from "../handler/AsyncHandler.js";
import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import { resetPasswordEmailTemplate } from "../emailTampelets/resetEmailTemp.js";
import emailSend from "../utils/emailSend.utils.js";


const me = AsyncHandler(async(req,res,next)=>{
    const user = req.user;

    res.status(200).json({
        success: true,
        message: "user fetched successfullys",
        user
    })
})


const changePassword = AsyncHandler(async(req,res,next)=>{

    const user = req.user; // here we  are getting user from auth middleware

    const {oldPassword , newPassword} = req.body; // getting old-password and new-password from the body

    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if(!isPasswordCorrect){
        return next(new CustomError(400, "the password is incorrect")); // if password is incorrect
    }

    if(newPassword === oldPassword){
        return next(new CustomError(400, "new password and old password are same")); // if new password and old password are same
    }

    user.password = newPassword; // updating password
    await user.save()   // saving the user in db

    res.status(200).json({
        success: true,
        message: "password changed successfully"   // sending success message
    })




})


const forgetPassword = AsyncHandler(async(req,res,next)=>{
    const {email} = req.body; //getting email from the body

    const user = await User.findOne({email}); // finding user in db

    if(!user){
        return next(new CustomError(400, "invalid credentials")); // if user not found
    }

    const token =  crypto.randomBytes(20).toString("hex");  // generating random token

    if(!token){
        return next(new CustomError(400, "token not generated")); // if token not generated
    }

    user.forgetPasswordToken = token; // storing token in db
    user.forgetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000; // storing token for 15 minutes expiry in db 

    await user.save(); // saving the user in db

    const forgetPasswordTemp = resetPasswordEmailTemplate(user.name , token); // sending email template

    await emailSend(user.email , "reset your password before 15 minutes", forgetPasswordTemp); // sending email

    res.status(200).json({
        success : true,
        message: "Reset password link send to your gmail, please check your email and reset your password",

    })

})


const resetPassword = AsyncHandler(async(req,res,next)=>{
    
    const {token} = req.params; // getting token from the params

    const {password , confirmPassword} = req.body; // getting password and confirm password from the body

    if(password !== confirmPassword){
        return next(new CustomError(400, "password and confirm password are not same"))
    }

    const user = await User.findOne({forgetPasswordToken:token, forgetPasswordTokenExpiry:{$gt:Date.now()}}); // finding user in db

    if(!user){
        return next(new CustomError(400, "token is invalid or has been expired")); // if token is invalid or has been expired
    }

    user.password = password; // updating password
    user.forgetPasswordToken = null; // clearing forgetPasswordToken
    user.forgetPasswordTokenExpiry = null; // clearing forgetPasswordTokenExpiry

    await user.save(); // saving the user in db

    res.status(200).json({
        success:true,
        message:"password reset successfully"
    })

})


export {me , changePassword , forgetPassword , resetPassword};