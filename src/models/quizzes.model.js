import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Book", bookSchema);



// schema for quizzes

// const quiz = {
//   title: "String",

//   questions: [
//     {
//       question: "String",
//       options: [],
//       correctOption: "String",
//     },
//   ],
// };
