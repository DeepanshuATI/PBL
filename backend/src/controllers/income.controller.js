import Income from "../models/income.model.js";
import { User } from "../models/user.model.js";
import mongoose  from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";


// Add Income
export const addIncome = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, amount, source, date, category } = req.body;

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
            userId,
            icon, // Attach user ID from middleware
            amount,
            source,
            date: new Date(date),
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
});

// Get Incomes
export const getIncomes = asyncHandler(async (req, res) => {
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
});


// Delete Income
export const deleteIncome = asyncHandler(async (req, res) => {
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
});

// Update Income
export const updateIncome = asyncHandler(async (req, res) => {
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
});



import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadIncomeExcel = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        // Create Excel file
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Define a proper path for the Excel file
        const filePath = path.join(__dirname, "../data/income_details.xlsx");

        // Save the file
        xlsx.writeFile(wb, filePath);

        // Send the file to the user
        res.download(filePath, "Income_details.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "File download failed", error: err.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
