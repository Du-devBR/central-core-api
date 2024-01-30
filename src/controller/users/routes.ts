import { FastifyInstance } from "fastify";
import { register } from "./usersController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
