import jwt from 'jsonwebtoken';

function generateAccessToken(user){

    if(!user){
        throw new Error('user is not found');
    }

    const token = jwt.sign({userId:user._id}, process.env.ACCESS_SECRET, {expiresIn: "1d"} )
    
    return token
}

function generateRefreshToken(user){

    if(!user){
        throw new Error('user is not found');
    }

    const token = jwt.sign({userId:user._id}, process.env.REFRESH_SECRET, {expiresIn: "9d"} )
    
    return token
}

export  {generateAccessToken, generateRefreshToken};
