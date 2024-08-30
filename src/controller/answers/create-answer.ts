import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { UserUnauthorizedError } from "@/use-cases/exceptions/user-unauthorized-error";
import { makeCreateAnswerUseCase } from "@/use-cases/factories/answers/make-create-answer-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createAnswer(req: FastifyRequest, reply: FastifyReply) {
  const answerBodySchema = z.object({
    content: z.string(),
    userId: z.string(),
    questionId: z.string(),
    parentId: z.string(),
  });

  const { userId, content, questionId, parentId } = answerBodySchema.parse(
    req.body,
  );

  if (req.user.userId !== userId) {
    reply.status(400);
    throw new UserUnauthorizedError();
  }

  try {
    const createAnswerUseCase = makeCreateAnswerUseCase();

    await createAnswerUseCase.execute({
      content,
      userId,
      questionId,
      parentId,
    });
    return reply.status(201).send();
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
