import { Answer, Prisma } from "@prisma/client";

export interface AnswersRepository {
  create(data: Prisma.AnswerUncheckedCreateInput): Promise<Answer>;
}
