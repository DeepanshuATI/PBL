import { Transaction } from "../models/transaction.model.js";
import  Income  from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { Category } from "../models/category.model.js";

// Add Transaction
export const addTransaction = async (req, res) => {
  try {
    const { amount, type, date, category_id, budget_id, related_id, description } = req.body;

    // Validate required fields
    if (!amount || !type || !date || !category_id) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: amount, type, date, or category_id",
      });
    }

    // Validate transaction type
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid transaction type. Must be 'income' or 'expense'.",
      });
    }

    // Validate category
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    // Validate related_id based on transaction type
    if (related_id) {
      if (type === "income") {
        const income = await Income.findById(related_id);
        if (!income) {
          return res.status(404).json({
            status: "error",
            message: "Related income not found",
          });
        }
      } else if (type === "expense") {
        const expense = await Expense.findById(related_id);
        if (!expense) {
          return res.status(404).json({
            status: "error",
            message: "Related expense not found",
          });
        }
      }
    }

    // Create transaction
    const transaction = new Transaction({
      user: req.user._id,
      amount,
      type,
      date,
      category: category_id,
      budget: budget_id || null,
      relatedModel: related_id || null,
      modelType: type === "income" ? "Income" : "Expense",
      description,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json({
      status: "success",
      message: "Transaction added successfully",
      data: savedTransaction,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error adding transaction",
      error: err.message,
    });
  }
};

// Get Transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("category", "name type")
      .populate({
        path: "relatedModel",
        select: "amount source date", // Populate related income/expense
      })
      .sort({ date: -1 });

    res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching transactions",
      error: err.message,
    });
  }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: transaction_id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found or not authorized to delete",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error deleting transaction",
      error: err.message,
    });
  }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { amount, type, date, category_id, budget_id, related_id, description } = req.body;

    // Validate related_id based on transaction type
    if (related_id) {
      if (type === "income") {
        const income = await Income.findById(related_id);
        if (!income) {
          return res.status(404).json({
            status: "error",
            message: "Related income not found",
          });
        }
      } else if (type === "expense") {
        const expense = await Expense.findById(related_id);
        if (!expense) {
          return res.status(404).json({
            status: "error",
            message: "Related expense not found",
          });
        }
      }
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transaction_id, user: req.user._id },
      {
        amount,
        type,
        date,
        category: category_id,
        budget: budget_id || null,
        relatedModel: related_id || null,
        modelType: type === "income" ? "Income" : "Expense",
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found or not authorized to update",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error updating transaction",
      error: err.message,
    });
  }
};
