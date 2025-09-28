import { Quiz } from "../models/quizzes.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getQuizBasedOnId = asyncHandler(async (req, res, next) => {
  const {quizId} = req.params;

  if (!quizId) {
    throw new ApiError(400, "quizId is required");
  }

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new ApiError(500, "something went wrong while fetching quiz");
  }

  req.quiz = quiz;

  next();
});
