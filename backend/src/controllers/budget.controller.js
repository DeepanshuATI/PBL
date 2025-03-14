import { Budget } from "../models/budget.model.js";

export const addBudget = async (req,res) => {
    try {
        const { user_id, category_id, amount, start_date, end_date } = req.body;
        const budget = await Budget.create({ user_id, category_id, amount, start_date, end_date});
        res.status(201).json({message:'Budget set successfully',budget_id:budget._id})
        
    } catch (err) {
        res.status(500).json({message:"Error setting Budget",error:err.message})
    }
};


export const getBudget = async (req,res) => {
    try {
        const budgets = await Budget.find({ user_id: req.params.user_id});
        res.json(budgets);
        
    } catch (err) {
        res.status(500).json({message:"Error fetching budget",error:err.message})
    }
};


export const deleteBudget = async (req,res) => {
    try {
        await Budget.findByIdAndDelete(req.params.id);
        res.json({message:'Budget deleted successufully'});
    } catch (err) {
        res.status(500).json({message:"Error deleting budget",error:err.message})
    }
};
