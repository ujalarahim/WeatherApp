// import passport from "passport";
// import { Strategy as GoogleStrategy} from "passport-google-oauth20";
// import User from "../models/user.model.js"



// //modifying the passport obj
// passport.use(new GoogleStrategy({  // this is the class thats why we use the new keyword

//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CLIENT_URL || "http://localhost:2000/api/v1/auth/google/callback",
//     scope: ["email" , "profile"]

// }, async (accessToken, refreshToken, profile, done)=>{  // this is a callback function that will check the following conditions 

//     try {
        
//         const user = await User.findOne({
//             $or: [
//                 {email: profile.emails[0].value},
//                 {googleId: profile.id}
//             ]
//         })

//         if(user){
//             if(!user.googleId){
//                 user.googleId = profile.id;
//                 user.provider = "google";
//                 user.save();
//             }
//             return done(null, user);
//         }
//         else{
//             const user = await User.create({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 name: profile.name.givenName,
//                 gender: "others",
//                 provider:"google"
                
//             })
//             return done(null, user);
//         }

//     } catch (error) {
//         return done(error, false);
//     }

// })

// )

// export {passport}


// //1. setup the google strategy and passport
// //2. then we will set the routes for the google auth
// //3. then we will set the middleware in the app.js 
// //4. then we will make a controller for the google auth

