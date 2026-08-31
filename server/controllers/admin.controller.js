import AsyncHandler from "../handler/AsyncHandler.js";
import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";

const deleteUser = AsyncHandler(async(req,res,next)=>{
    
    const userId = req.params.userId; //getting id from the params

    const user = await User.findByIdAndDelete(userId) //search in db and delete it

    if(!user){
        return next(new CustomError(400,"user not found"))
    }

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })



})

export {deleteUser}