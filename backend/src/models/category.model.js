import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const Category = mongoose.model("Category",categorySchema);