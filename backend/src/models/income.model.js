import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
  {
    
    user:{
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value > 0,
        message: "Amount must be a positive number",
      },
    },
    
    source: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

const Income = mongoose.model("Income",incomeSchema);
export default Income;