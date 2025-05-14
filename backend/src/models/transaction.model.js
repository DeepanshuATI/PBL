import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Transaction Schema
const TransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      default: null,
    },
    relatedModel: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "modelType",
      default: null,
    },
    modelType: {
      type: String,
      enum: ["Income", "Expense"],
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    // Source field for income transactions
    source: {
      type: String,
      required: function () {
        return this.type === "income"; // Ensure 'source' is required only for income transactions
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Transaction model
const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
