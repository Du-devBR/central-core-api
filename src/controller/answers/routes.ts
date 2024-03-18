import { FastifyInstance } from "fastify";
import { verifyJwtAuth } from "../middlewares/verify-jwt-auth";
import { createAnswer } from "./create-answer";

export async function answersRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtAuth);
  app.post("/answer", createAnswer);
}
