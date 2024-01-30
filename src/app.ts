import fastify from "fastify";
import { usersRoutes } from "./controller/users/routes";

export const app = fastify();

app.register(usersRoutes);
