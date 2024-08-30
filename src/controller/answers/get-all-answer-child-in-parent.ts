import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { makeGetAllAnswerChildInParentUseCase } from "@/use-cases/factories/answers/make-get-all-answer-child-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getAllAnswerChildInParent(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllAnswerChildInParentSchema = z.object({
    questionId: z.string(),
    parentId: z.string(),
  });

  const { questionId, parentId } = getAllAnswerChildInParentSchema.parse(
    req.params,
  );

  try {
    const getAllAnswerChildParentUseCase =
      makeGetAllAnswerChildInParentUseCase();

    const { answers } = await getAllAnswerChildParentUseCase.execute({
      questionId,
      parentId,
    });

    return reply.status(201).send({ answers });
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
