import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/users/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    github: z.string(),
  });

  const { email, github, name, lastname } = registerBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name,
      lastname,
      email,
      github,
    });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
