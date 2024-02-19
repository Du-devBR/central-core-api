import { HandleCatchError } from "@/use-cases/exceptions/handle-catch-erros";
import { makeGetAllQuestionUseCase } from "@/use-cases/factories/questions/make-get-all-questions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllQuestion(req: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllQuestionUseCase = makeGetAllQuestionUseCase();

    const { questions } = await getAllQuestionUseCase.execute();
    return reply.status(201).send({ questions });
  } catch (err) {
    const error = new HandleCatchError();
    return reply.status(409).send({ message: error.message });
  }
}
