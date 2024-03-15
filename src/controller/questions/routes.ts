import { FastifyInstance } from "fastify";
import { createQuestion } from "./create-questions";
import { verifyJwtAuth } from "../middlewares/verify-jwt-auth";
import { getAllQuestion } from "./get-all-questions";
import { getByIdQuestion } from "./get-by-id-question";
import { getByTextTypedQuestion } from "./get-by-text-typed";

export async function questionRoutes(app: FastifyInstance) {
  // app.addHook("onRequest", verifyJwtAuth);
  app.post("/question", createQuestion);
  app.get("/question", getAllQuestion);
  app.get("/question/id", getByIdQuestion);
  app.get("/search/q", getByTextTypedQuestion);
}
