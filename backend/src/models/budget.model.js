import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    limit: {
      type: Number,
      required: true, 
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    spent: {
      type: Number,
      default: 0, 
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budgetSchema);
