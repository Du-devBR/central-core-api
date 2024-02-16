import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { UserUnauthorizedError } from "@/use-cases/exceptions/user-unauthorized-error";
import { makeCreateQuestionUseCase } from "@/use-cases/factories/questions/make-create-question-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createQuestion(req: FastifyRequest, reply: FastifyReply) {
  const questionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    userId: z.string(),
  });

  const { userId, title, content } = questionBodySchema.parse(req.body);

  if (req.user.userId !== userId) {
    reply.status(400);
    throw new UserUnauthorizedError();
  }

  try {
    const createQuestionUseCase = makeCreateQuestionUseCase();

    await createQuestionUseCase.execute({
      title,
      content,
      userId,
    });
    return reply.status(201).send();
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
