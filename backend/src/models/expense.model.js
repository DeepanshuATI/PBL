import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category:{
      type:Schema.Types.ObjectId,
      ref:"Category",
      required:true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);


export const Expense = mongoose.model("Expense",expenseSchema);