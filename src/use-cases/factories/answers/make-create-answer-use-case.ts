import { PrismaAnswerRepository } from "@/respositories/prisma/prisma-answers-repository";
import { CreateAnswerUseCase } from "@/use-cases/answers/create-answer";

export function makeCreateAnswerUseCase() {
  /**
   * Factory for create an instance of registerUseCase with:
   * @instance {PrismaAnswerRepository}
   * @returns {CreateAnswerUseCase}
   */
  const answerRepository = new PrismaAnswerRepository();
  const createAnswerUseCase = new CreateAnswerUseCase(answerRepository);

  return createAnswerUseCase;
}
