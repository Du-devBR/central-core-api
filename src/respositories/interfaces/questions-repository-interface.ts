import { Prisma, Question } from "@prisma/client";

export interface QuestionsRespository {
  create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question>;
  findAll(): Promise<Question[]>;
  findById(id: string): Promise<Question | null>;
  findByTextTyped(text: string): Promise<Question[]>;
}
