import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Each user can have their own categories
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String, // Optional icon for the category (e.g., a URL or an emoji)
    },
    color: {
      type: String, // Optional color for UI representation
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
