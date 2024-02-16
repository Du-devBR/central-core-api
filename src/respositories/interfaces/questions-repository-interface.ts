import { Prisma, Question } from "@prisma/client";

export interface QuestionsRespository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>;
  findAll(): Promise<Question[]>;
}
