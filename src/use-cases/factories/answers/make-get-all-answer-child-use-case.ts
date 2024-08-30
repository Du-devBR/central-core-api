import { PrismaAnswerRepository } from "@/respositories/prisma/prisma-answers-repository";
import { GetAllAnswerChildInParentUseCase } from "@/use-cases/answers/get-all-answer-child-in-parent";

export function makeGetAllAnswerChildInParentUseCase() {
  /**
   * Factory for get all answers parents in the questions an instance of GetAllAnswerChildInParentUseCase with:
   * @instance {PrismaQuestionsRepository}
   * @returns {GetAllAnswerChildInParentUseCase}
   */
  const answerRepository = new PrismaAnswerRepository();
  const getAllAnswerChildInParentUseCase = new GetAllAnswerChildInParentUseCase(
    answerRepository,
  );

  return getAllAnswerChildInParentUseCase;
}
