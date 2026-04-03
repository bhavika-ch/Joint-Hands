import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    summary:{
        type:String,
        required:true
    },

    Experience:{
        type:String,
        required:true
    },

    Education:{
        type:String,
        required:true
    },
    Skills:{
        type:String,
        required:true
    }
})

export const Profile = mongoose.model("Profile",profileSchema)