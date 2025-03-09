import mongoose from "mongoose";
import bcrypt from "bcrypt";


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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User",userSchema);