import { PrismaAnswerRepository } from "@/respositories/prisma/prisma-answers-repository";
import { GetAllAnswerInQuestionUseCase } from "@/use-cases/answers/get-all-answer-parent-in-question";

export function makeGetAllAnswerInQuestionUseCase() {
  /**
   * Factory for get all answers parents in the questions an instance of GetAllAnswerInQuestionUseCase with:
   * @instance {PrismaQuestionsRepository}
   * @returns {GetAllAnswerInQuestionUseCase}
   */
  const answerRepository = new PrismaAnswerRepository();
  const getAllAnswerInQuestionUseCase = new GetAllAnswerInQuestionUseCase(
    answerRepository,
  );

  return getAllAnswerInQuestionUseCase;
}
