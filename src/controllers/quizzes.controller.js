import { Question } from "../models/questions.model.js";
import { Quiz } from "../models/quizzes.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createQuiz = asyncHandler(async (req, res) => {
  const body = req.body;

  const { title } = body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const quiz = await Quiz.create({
    title,
  });

  if (!quiz) {
    throw new ApiError(500, "Quiz cannot be created");
  }

  res
    .status(201)
    .json(new ApiResponse(201, quiz, "new quiz created successfully"));
});

const addQuestion = asyncHandler(async (req, res) => {
  const body = req.body;

  const { text, options, correctOption } = body;

  if (!text) {
    throw new ApiError(400, "Question is required");
  }
  if (!options || typeof options !== "object") {
    throw new ApiError(400, "options are required");
  }

  // console.log(correctOption, Object.keys(options), options.hasOwnProperty(correctOption))
  if (!correctOption || !options.hasOwnProperty(correctOption)) {
    throw new ApiError(
      400,
      "correct option is required or should be same to one in options"
    );
  }

  const quiz = req.quiz;

  const questionObject = await Question.create({
    text,
    options,
    correctOption,
  });

  if (!questionObject) {
    throw new ApiError(500, "something went wrong while creating question");
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    quiz._id,
    { $push: { questions: questionObject._id } },
    { new: true }
  );

  if (!updatedQuiz) {
    throw new ApiError(
      500,
      "something went wrong while updating quiz with new question"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedQuiz, "question added successfully"));
});

const getQuestions = asyncHandler(async (req, res) => {
  const quiz = req.quiz;

  const allQuestions = (
    await quiz.populate({
      path: "questions",
      select: "-correctOption",
    })
  )?.questions;

  if (!allQuestions || !Array.isArray(allQuestions)) {
    throw new ApiError(
      500,
      "something went wrong while fetching all questions"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, allQuestions, "all questions retrieved successfully")
    );
});

// query parameter /?includeQuestions=true
const getAllquizzes = asyncHandler(async (req, res) => {
  const includeQuestions = req.query.includeQuestions === "true";

  let quizzes;
  if (includeQuestions) {
    quizzes = await Quiz.find().populate({
      path: "questions",
      select: "-correctOption",
    });
  } else {
    quizzes = await Quiz.find();
  }

  if (!quizzes) {
    throw new ApiError(500, "something went wrong while fetching all quizzes");
  }

  res
    .status(200)
    .json(new ApiResponse(200, quizzes, "all quizzes retrieved successfully"));
});

const evaluateQuiz = asyncHandler(async (req, res) => {
  const body = req.body;
  const { selection } = body;

  if (!selection || !Array.isArray(selection)) {
    throw new ApiError(
      400,
      "selection is required and it should be array of question ids and associated selected option"
    );
  }

  const quiz = await req.quiz.populate({
    path: "questions",
    select: "_id correctOption",
  });

  let score = 0;

  // used map to calculate score in o(n) times
  const map = {};

  quiz.questions.forEach((question) => {
    map[question._id] = question.correctOption;
  });

  selection.forEach((item) => {
    if (map[item.questionId] === item.correctOption) {
      score++;
    }
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { score, total: quiz.questions.length },
        "score calculated successfully"
      )
    );
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new ApiError(400, "title is required to change");
  }

  const quiz = req.quiz;

  quiz.title = title;
  const updatedQuiz = await quiz.save({ new: true });

  if (!updatedQuiz) {
    throw new ApiError(500, "something went wrong while updating the quiz");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateQuiz, "quiz updated successfully"));
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.quiz._id);

  res.status(200).json(new ApiResponse(200, quiz, "quiz deleted successfully"));
});

const getQuiz = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.quiz, "quiz retrieved successfully"));
});
export {
  createQuiz,
  addQuestion,
  getQuestions,
  getAllquizzes,
  evaluateQuiz,
  updateQuiz,
  deleteQuiz,
  getQuiz,
};
