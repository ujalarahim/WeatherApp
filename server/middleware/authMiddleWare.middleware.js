import AsyncHandler from "../handler/AsyncHandler.js";
import CustomError from "../handler/CustomError.handler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const authMiddleWare = AsyncHandler(async(req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer " , "");
    console.log(token, "this is token")

    if(!token){
        return next(new CustomError(401, "unauthorized"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);

    const userId = decodedToken.userId;

    if(!userId){
        return next(new CustomError(401, "unauthorized"));
    }

    const user = await User.findById(userId).select('+password');

    if(!user){
        return next(new CustomError(401, "unauthorized"));
    }

    req.user = user;
    req.role = user.role;
    next();

})

export default authMiddleWare