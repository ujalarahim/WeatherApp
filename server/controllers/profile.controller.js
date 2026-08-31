import AsyncHandler from "../handler/AsyncHandler.js"
import {uploadToCloudinary} from "../utils/uploadToCloudinary.js"
import CustomError from "../handler/CustomError.handler.js"
import Profile from "../models/profile.model.js"


const addProfile = AsyncHandler(async(req,res,next)=>{
    const file = req.file;
    console.log(file);
    
    const result = await uploadToCloudinary({
        resource_type: "image",
        buffer: file.buffer,
        folder: "inter-profile"
    })

    if(!result){
        return next(new CustomError(400, "profile not uploaded"))
    }

    const profile = await Profile.create({secureUrl:result.secure_url , publicId:result.public_id})

     if(!profile){
        return next(new CustomError(500 , "Failed to create profile")); 
     }

     res.status(201).json({message:"Profile created successfully" , profile})
})

export  {addProfile};  