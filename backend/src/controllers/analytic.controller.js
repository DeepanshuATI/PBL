import { Expense } from '../models/expense.model.js';
import mongoose from 'mongoose';


export const getExpenseSummery = async (req,res) => {
    try {
        const summary = await Expense.aggregate([
            {$match:{ user_id: mongoose.Types.ObjectId(req.params.user_id)}},
            {$group: {_id:'$category_id',total_spent: {$sum: '$amount'}}},
            { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
            { $unwind: "$category" },
            { $project: { _id: 0, category: "$category.name", total_spent: 1 } }
        ]);
        res.json(summary);
        
    } catch (err) {
        res.status(500).json({message:'Error fetching summary',error:err.message});
    }
};

export const getMonthlyTrends = async (req,res) => {
    try {
        const trends = await Expense.aggregate([
            {$match : {user_id: mongoose.Types.ObjectId(req.params.user_id)}},
            { $group: { _id: { $month: "$date" }, total_spent: { $sum: "$amount" } } },
            { $sort: { "_id": 1 } },
            { $project: { month: "$_id", total_spent: 1, _id: 0 } }
        ]);
        res.json(trends);
        
    } catch (err) {
        res.status(500).json({message:'Error fetching trends',error:err.message});
    }
};