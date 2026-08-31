// here are we going to make cookies options we used them in auth controller

const cookiesOptions = {
    httpOnly: true, // cookies will be accessible from the backend only
    secure: false, // cookies will be sent only over https
    sameSite: "strict", // cookies will be sent only from the same site
    maxAge: 8*24 * 60 * 60 * 1000 // cookies will be valid for 8 day
}


export default cookiesOptions