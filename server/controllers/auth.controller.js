import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";
import AsyncHandler from "../handler/AsyncHandler.js";
import {generateAccessToken , generateRefreshToken } from "../utils/generateAccessToken.js";
import cookiesOptions from "../utils/cookiesOptions.js";
import jwt from "jsonwebtoken"
import { welcomeEmailTemplate } from "../emailTampelets/regWelcomeEmailTemplet.js";
import emailSend from "../utils/emailSend.utils.js";



//register user

const registerUser = AsyncHandler(async(req,res,next)=>{

    // destructuring properties
    let {name, email, password, gender} = req.body;

    // // check all fields are filled
    // if(!name || !email || !password || !gender){
    //     return next(new CustomError(400, "All fields are required"));
    // }

    // //check check gender is valid
    // const validGenders = ['male', 'female', 'others'];
    // if(!validGenders.includes(gender)){
    //     return next(new CustomError(400, "Invalid gender"));
    // }

    // //check for email
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(!emailRegex.test(email)){
    //     return next(new CustomError(400, "Invalid email"));
    // }

    // // check for password length
    // if(password.length < 8){
    //     return next (new CustomError(400, "Password must be at least 8 characters long"));
    // }

    // check for duplicate email
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new CustomError(400, "User already exist"));
    }

    // now finally it passed all the checks now it will go to store in DB

    const user = await User.create({
        name,
        email,
        password,
        gender
    })


    if(!user){
        return next(new CustomError(500, "Something went wrong"));
    }

    const welcomeEmailTemplete = welcomeEmailTemplate(user.name , user.email);

    await emailSend(user.email , "welcome to our website" , welcomeEmailTemplete);

    res.status(201).json({
        message: 'user is created successfully',
        user: user
    })

    
    })


    // login user

const LoginUser = AsyncHandler(async(req,res,next)=>{

    const {email, password} = req.body; // getting email and password

    const user = await User.findOne({email}).select('+password');  // finding user

    if(!user){
        return next(new CustomError(400, "invalid credentials"))
    }

    const checkPassword = await user.comparePassword(password); // checking password

    if(!checkPassword){
        return next(new CustomError(400, "invalid credentials"))
    }

    const accessToken = generateAccessToken(user); // generating token
    const refreshToken = generateRefreshToken(user); //generating refresh token

    //store in db
    user.refreshToken = [{token: refreshToken, createdAt: Date.now()}]; // storing refresh token
    await user.save({validateBeforeSave: false}) //this will not validate before saving


    res
    .cookie("refreshToken", refreshToken , cookiesOptions) // sending refresh token in cookies
    .status(200)
    .json({
        success: true,
        message: "user logged in successfully",
        accessToken,
        user
    })






})


const refreshToken = AsyncHandler(async (req,res,next)=>{

    const getToken = req.cookies.refreshToken;

    // console.log(getToken)

    if(!getToken){
        return next(new CustomError(401, "unauthorized"));
    }
    
    const decoded = jwt.verify(getToken, process.env.REFRESH_SECRET)

    if(!decoded.userId){
        return next(new CustomError(401, "unauthorized"));
    }

    const isTokenExist = await User.findOne({"refreshToken.token": getToken});

    if(!isTokenExist){
        return next(new CustomError(401, "unauthorized"));
    }

    const newRefreshToken = generateRefreshToken(isTokenExist);
    const newAccessToken =  generateAccessToken(isTokenExist);

    isTokenExist.refreshToken = [{token:newRefreshToken , createdAt:Date.now()}]

    await isTokenExist.save({validateBeforeSave: false})

    res
    .cookie("refreshToken" , newRefreshToken , cookiesOptions)
    .status(201)
    .json({
        success:true,
        message: `${isTokenExist.name} your token is refreshed successfully`,
        accessToken:newAccessToken,
        user: isTokenExist
    })



})


const logoutUser = AsyncHandler(async(req,res,next)=>{

    const user = req.user;
    user.refreshToken = null;
    await user.save({validateBeforeSave: false})

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })

    res.status(200).json({
        success:true,
        message: `${user.name} you are logged out successfully`
    })

})

const googleAuthCallback = AsyncHandler(async(req,res,next)=>{

        try {
            
            // here we will get the user from the passport
            const user = req.user;

            // generating access tokens
            const accessToken = generateAccessToken(user);

            // generating refresh tokens
            const refreshToken = generateRefreshToken(user);

            //now we will store token in db
            user.refreshToken = [{token:refreshToken , createdAt:new Date()}]
            await user.save()

            //store refresh token in cookies
            res.cookie("refreshToken" , refreshToken , cookiesOptions)

            res.redirect(`http://localhost:5173/auth/success?accessToken=${accessToken}`)
            



        } catch (error) {
            res.redirect(`http://localhost:5173/auth/failure?error=${encodeURIComponent(error.message)}`)
        }

})


export { registerUser, LoginUser, refreshToken, logoutUser, googleAuthCallback};