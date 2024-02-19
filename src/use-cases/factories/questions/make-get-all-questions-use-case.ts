import { PrismaQuestionsRepository } from "@/respositories/prisma/prisma-questions-repository";
import { GetAllQuestionsUseCase } from "@/use-cases/questions/get-all-questions";

export function makeGetAllQuestionUseCase() {
  /**
   * Factory for get all questions an instance of GetAllQuestionsUseCase with:
   * @instance {PrismaQuestionsRepository}
   * @returns {GetAllQuestionsUseCase}
   */
  const questionsRepository = new PrismaQuestionsRepository();
  const getAllQuestionUseCase = new GetAllQuestionsUseCase(questionsRepository);

  return getAllQuestionUseCase;
}
