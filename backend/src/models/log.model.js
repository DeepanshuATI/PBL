import mongoose, { Schema } from "mongoose";

const logSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  budget: {
    type:Schema.Types.ObjectId,
    ref:"Budget",
    required:true,
}
});


export const Log = mongoose.model("Log",logSchema);