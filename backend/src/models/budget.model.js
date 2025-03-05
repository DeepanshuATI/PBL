import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  budget_limit: {
    type: Number,
    required: true,
  },
  category:{
    type:Schema.Types.ObjectId,
    ref:"Category",
    required:true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
},{timstamps:true});

export const Budget = mongoose.model("Budget", budgetSchema);
