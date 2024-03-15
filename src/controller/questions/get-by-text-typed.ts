import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { makeGetByTextTypedQuestionUseCase } from "@/use-cases/factories/questions/make-get-by-text-typed-questions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getByTextTypedQuestion(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getByTextTypedQuestionQuerySchema = z.object({
    text: z.string(),
  });

  const { text } = getByTextTypedQuestionQuerySchema.parse(req.query);
  try {
    const getByTextTypedQuestionUseCase = makeGetByTextTypedQuestionUseCase();

    const { question } = await getByTextTypedQuestionUseCase.execute({ text });
    return reply.status(201).send({ question });
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
