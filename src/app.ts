import fastify from "fastify";
import { usersRoutes } from "./controller/users/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { questionRoutes } from "./controller/questions/routes";
import { answersRoutes } from "./controller/answers/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(questionRoutes);
app.register(answersRoutes);
