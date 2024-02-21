import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { makeGetByIdQuestionUseCase } from "@/use-cases/factories/questions/make-get-by-id-question-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getByIdQuestion(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getByIdQuestionQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = getByIdQuestionQuerySchema.parse(req.query);
  try {
    const getByIdQuestionUseCase = makeGetByIdQuestionUseCase();

    const { question } = await getByIdQuestionUseCase.execute({ id });
    return reply.status(201).send({ question });
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
