import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: [300, "Question text must be smaller or equal to 300 chars"],
    },
    options: {
      type: Map,
      of: {
        type: String,
        maxLength: [300, "Options cannot exceed 300 chars"],
      },
    },
    correctOption: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
