import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usernmae:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Passowrd is required']
      },
    fullname:{
        type:String,
        required:true,
        trim:true,
      },
    
      avatar:{
        type:String, //cloudinary url
        required:true,
      },
    
      coverImage:{
        type:String,  //cloudinary url
      },
},{timestamps:true});

export const User = mongoose.model("User",userSchema);