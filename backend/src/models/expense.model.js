import mongoose, { Schema } from "mongoose";


const expenseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Links the expense to a user
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    icon: {
      type:String, 
    },

    category: {
      type:String,
      required:true
    },
  
    date: {
      type: Date,
      required:true,
      default: Date.now, // Date of the expense
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", expenseSchema);
