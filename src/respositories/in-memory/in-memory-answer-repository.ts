import { Answer, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AnswersRepository } from "../interfaces/answers-repository-interface";

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(data: Prisma.AnswerUncheckedCreateInput) {
    const answer = {
      id: randomUUID(),
      content: data.content,
      user_id: data.user_id,
      question_id: data.question_id,
      parent_id: randomUUID(),
      likes: null,
      cretated_at: new Date(),
      modified_at: null,
    };

    this.items.push(answer);

    return answer;
  }
}
