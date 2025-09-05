import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    completed: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

TodoSchema.index({ createdAt: -1 });

export const Todo = mongoose.model("Todo", TodoSchema);
