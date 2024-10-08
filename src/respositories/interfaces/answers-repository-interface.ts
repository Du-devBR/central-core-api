import { Answer, Prisma } from "@prisma/client";

export interface AnswersRepository {
  create(data: Prisma.AnswerUncheckedCreateInput): Promise<Answer>;
  findAllAnswersParentInTheQuestion(questionId: string): Promise<Answer[]>;
  findAllAnswersChildInTheParent(
    questionId: string,
    parentId: string,
  ): Promise<Answer[]>;
}
