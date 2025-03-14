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