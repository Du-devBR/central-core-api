import { FastifyInstance } from "fastify";
import { register } from "./usersController";
import { confirmAccount } from "./confirmAccount";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.get("/confirmAccount", confirmAccount);
}
