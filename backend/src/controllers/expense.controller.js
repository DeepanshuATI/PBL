import { Expense } from "../models/expense.model.js";

export const addExpense = async (req,res) => {
     try {
        const { user_id, amount, data, category_id, description } = req.body;
        const expense = await Expense.create({ user_id, amount, date, category_id, description});
        res.status(201).json({message:'Expense added successfully',expense_id:expense._id})
     } catch (err) {
        res.status(500).json({message:"Error adding expense",error:err.message});
     }
};


export const getExpense = async (req,res) => {
    try {
        const expenses = await Expense.find({ user_id: req.params.user_id}).populate('category_id', 'name type');
        res.json(expenses);
        
    } catch (err) {
        res.status(500).json({message: "Error fetching expense",error:err.message});
    }
};


export const deleteExpense = async (req, res) => {
    try {
      const { expense_id } = req.params;
  
      // Validate expense_id
      if (!expense_id) {
        return res.status(400).json({
          status: "error",
          message: "Expense ID is required",
        });
      }
  
      // Find and delete the expense
      const deletedExpense = await Expense.findOneAndDelete({
        _id: expense_id,
        user_id: req.user._id, // Ensure the user owns the expense
      });
  
      // Check if the expense exists
      if (!deletedExpense) {
        return res.status(404).json({
          status: "error",
          message: "Expense not found or not authorized to delete",
        });
      }
  
      // Respond with success
      res.status(200).json({
        status: "success",
        message: "Expense deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Error deleting expense",
        error: err.message,
      });
    }
  };