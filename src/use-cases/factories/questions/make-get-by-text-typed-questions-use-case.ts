import { PrismaQuestionsRepository } from "@/respositories/prisma/prisma-questions-repository";
import { GetByTextTypedQuestionUseCase } from "@/use-cases/questions/get-by-text-typed";

export function makeGetByTextTypedQuestionUseCase() {
  /**
   * Factory for get question by text typed an instance of GetByIdQuestionUseCase with:
   * @instance {PrismaQuestionsRepository}
   * @returns {GetByTextTypedQuestionUseCase}
   */
  const questionRepository = new PrismaQuestionsRepository();
  const getByTextTypedQuestionUseCase = new GetByTextTypedQuestionUseCase(
    questionRepository,
  );

  return getByTextTypedQuestionUseCase;
}
