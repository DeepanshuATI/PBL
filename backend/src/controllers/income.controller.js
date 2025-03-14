import Income from "../models/income.model.js";
import mongoose  from "mongoose";

// Add Income
export const addIncome = async (req, res) => {
    try {
        const { amount, source, date, category } = req.body;

        // Validate user
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        // Validate required fields
        if (!source || !amount || !date) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields: source, amount, or date",
            });
        }

        // Create income
        const income = new Income({
            user: req.user._id, // Attach user ID from middleware
            amount,
            source,
            date,
            category, // Optional
        });

        // Save income
        const savedIncome = await income.save();
        res.status(201).json({
            status: "success",
            message: "Income added successfully",
            data: savedIncome,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to add income",
            error: err.message,
        });
    }
};

// Get Incomes
export const getIncomes = async (req, res) => {
    try {
        // Validate user
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        // Fetch incomes
        const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });

        res.status(200).json({
            status: "success",
            data: incomes,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch incomes",
            error: err.message,
        });
    }
};


// Delete Income
export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid income ID",
            });
        }

        const income = await Income.findOne({ _id: id, user: req.user._id });
        if (!income) {
            return res.status(404).json({
                status: "error",
                message: "Income not found or not authorized to delete",
            });
        }

        await income.deleteOne();

        res.status(200).json({
            status: "success",
            message: "Income deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete income",
            error: err.message,
        });
    }
};

// Update Income
export const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, source, date, category } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized: User not identified",
            });
        }

        const income = await Income.findOne({ _id: id, user: req.user._id });
        if (!income) {
            return res.status(404).json({
                status: "error",
                message: "Income not found or not authorized to update",
            });
        }

        // Update fields
        income.amount = amount || income.amount;
        income.source = source || income.source;
        income.date = date || income.date;
        income.category = category || income.category;

        const updatedIncome = await income.save();

        res.status(200).json({
            status: "success",
            message: "Income updated successfully",
            data: updatedIncome,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to update income",
            error: err.message,
        });
    }
};
