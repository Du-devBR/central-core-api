import { PrismaQuestionsRepository } from "@/respositories/prisma/prisma-questions-repository";
import { GetByIdQuestionUseCase } from "@/use-cases/questions/get-by-id-question";

export function makeGetByIdQuestionUseCase() {
  /**
   * Factory for get question by id an instance of GetByIdQuestionUseCase with:
   * @instance {PrismaQuestionsRepository}
   * @returns {GetByIdQuestionUseCase}
   */
  const questionRepository = new PrismaQuestionsRepository();
  const getByIdQuestionUseCase = new GetByIdQuestionUseCase(questionRepository);

  return getByIdQuestionUseCase;
}
