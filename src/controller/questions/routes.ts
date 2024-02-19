import { FastifyInstance } from "fastify";
import { createQuestion } from "./create-questions";
import { verifyJwtAuth } from "../middlewares/verify-jwt-auth";
import { getAllQuestion } from "./get-all-questions";

export async function questionRoutes(app: FastifyInstance) {
  // app.addHook("onRequest", verifyJwtAuth);
  app.post("/question", createQuestion);
  app.get("/question", getAllQuestion);
}
