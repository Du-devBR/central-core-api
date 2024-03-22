import { FastifyInstance } from "fastify";
import { verifyJwtAuth } from "../middlewares/verify-jwt-auth";
import { createAnswer } from "./create-answer";
import { getAllAnswerInQuestion } from "./get-all-answer-in-question";
import { getAllAnswerChildInParent } from "./get-all-answer-child-in-parent";

export async function answersRoutes(app: FastifyInstance) {
  app.post("/answer", { onRequest: [verifyJwtAuth] }, createAnswer);
  app.get("/question/:questionId/answers", getAllAnswerInQuestion);
  app.get("/question/:questionId/answer/:parentId", getAllAnswerChildInParent);
}
