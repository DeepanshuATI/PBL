import { Category } from "../models/category.model.js";

export const createCategory  =async (req,res) => {
    try {
        const { user_id, name, type, icon, color } = req.body;
        const category = await Category.create({ user_id, name, type, icon, color});
        res.status(201).json({message:'Category created successfully',category_id:category._id});
    } catch (err) {
        res.status(500).json({messsage:"Error creating Category ",error:err.messsage});
    }
};


export const getCategory = async (req,res) => {
    try {
        const categories = await Category.find({ user_id:req.params.user_id});
        res.json(categories);
        
    } catch (err) {
        res.status(500).json({messsage:"Errro fetching category ",error:err.message});
    }
};