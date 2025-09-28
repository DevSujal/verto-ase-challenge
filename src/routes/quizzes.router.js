import { Router } from "express";
import {
  addQuestion,
  createQuiz,
  deleteQuiz,
  evaluateQuiz,
  getAllquizzes,
  getQuestions,
  getQuiz,
  updateQuiz,
} from "../controllers/quizzes.controller.js";
import { getQuizBasedOnId } from "../middlewares/quizzes.midddleware.js";

const router = Router();

router.route("/").post(createQuiz).get(getAllquizzes);
router
  .route("/:quizId")
  .patch(getQuizBasedOnId, updateQuiz)
  .delete(getQuizBasedOnId, deleteQuiz)
  .get(getQuizBasedOnId, getQuiz);

router
  .route("/:quizId/questions")
  .post(getQuizBasedOnId, addQuestion)
  .get(getQuestions);

router.route("/:quizId/submit").post(getQuizBasedOnId, evaluateQuiz);

export default router;
