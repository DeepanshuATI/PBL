import Category from "../models/category.model.js";

export const createCategory  =async (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({messsage:"Error creating Category ",error:err.messsage});
    }
};


export const getCategory = async (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({messsage:"Errro fetching category ",error:err.message});
    }
};