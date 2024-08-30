import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { makeGetAllAnswerInQuestionUseCase } from "@/use-cases/factories/answers/make-get-all-answer-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getAllAnswerInQuestion(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllAnswersInQuestionSchema = z.object({
    questionId: z.string(),
  });

  const { questionId } = getAllAnswersInQuestionSchema.parse(req.params);

  try {
    const getAllAnswersInQuestionUseCase = makeGetAllAnswerInQuestionUseCase();

    const { answers } = await getAllAnswersInQuestionUseCase.execute({
      questionId,
    });

    return reply.status(201).send({ answers });
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
