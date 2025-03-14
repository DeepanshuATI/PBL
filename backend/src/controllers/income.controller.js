import Income from "../models/income.model.js";

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
