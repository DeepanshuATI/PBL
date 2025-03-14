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


export const deleteCategory = async (req, res) => {
    try {
      const { category_id } = req.params;
  
      // Validate category_id
      if (!category_id) {
        return res.status(400).json({
          status: "error",
          message: "Category ID is required",
        });
      }
  
      // Find and delete the category
      const deletedCategory = await Category.findOneAndDelete({
        _id: category_id,
        user_id: req.user._id, // Ensure the user owns the category
      });
  
      // Check if the category exists
      if (!deletedCategory) {
        return res.status(404).json({
          status: "error",
          message: "Category not found or not authorized to delete",
        });
      }
  
      // Respond with success
      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Error deleting category",
        error: err.message,
      });
    }
  };