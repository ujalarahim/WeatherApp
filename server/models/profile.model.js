import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    secureUrl:{
        type: String,
    },
    publicId:{
        type:String
    }
})

const Profile = mongoose.model("Profile", ProfileSchema)

export default Profile;