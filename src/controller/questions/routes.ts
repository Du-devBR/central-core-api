import { FastifyInstance } from "fastify";
import { createQuestion } from "./create-questions";
import { verifyJwtAuth } from "../middlewares/verify-jwt-auth";

export async function questionRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtAuth);
  app.post("/question", createQuestion);
}
