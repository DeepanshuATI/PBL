import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from '../models/user.model.js';


//const SECRET_KEY = "mysecretkey";

exports.registerUser = async ( req,res) => {
  try {
    
  } catch (err) {
       res.status(500).json({messgae: "Error creating user",error:err.messgae})
  }  
};


exports.loginUser = async(req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({messgae:"Error logging in ",error:err.message});
    }
};


exports.getUserProfile = async (req,res) => {
     try {
        
     } catch (err) {
        res.status(401).json({message:"Unauthorized",error:err.message})
     }  
};