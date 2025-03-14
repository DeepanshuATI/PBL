import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true, // e.g., "Created Expense", "Updated Budget"
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: true, // Links to the affected Expense, Category, or Budget
    },
    referenceType: {
      type: String,
      required: true, // e.g., "Expense", "Category", "Budget"
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Log = mongoose.model("Log", logSchema);
