import Expense from "../models/expense.model.js";

export const addExpense = async (req,res) => {
     try {
        
     } catch (err) {
        res.status(500).json({message:"Error adding expense",error:err.message});
     }
};


export const getExpense = async (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({message: "Error fetching expense",error:err.message});
    }
};