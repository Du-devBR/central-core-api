import { PrismaQuestionsRepository } from "@/respositories/prisma/prisma-questions-repository";
import { CreateQuestionUseCase } from "@/use-cases/questions/create-question";

export function makeCreateQuestionUseCase() {
  /**
   * Factory for create an instance of registerUseCase with:
   * @instance {PrismaUsersRepository}
   * @returns {CreateQuestionUseCase}
   */
  const questionsRepository = new PrismaQuestionsRepository();
  const createQuestionUseCase = new CreateQuestionUseCase(questionsRepository);

  return createQuestionUseCase;
}
