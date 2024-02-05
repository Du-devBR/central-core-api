import { UserAlreadyExistsError } from "@/use-cases/exceptions/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/users/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password, name, lastname } = registerBodySchema.parse(
    req.body,
  );

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      lastname,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
