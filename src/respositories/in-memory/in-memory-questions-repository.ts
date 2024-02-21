import { Prisma, Question } from "@prisma/client";
import { randomUUID } from "crypto";
import { QuestionsRespository } from "../interfaces/questions-repository-interface";

export class InMemoryQuestionsRepository implements QuestionsRespository {
  public items: Question[] = [];

  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      user_id: data.user_id,
      likes: null,
      saved: null,
      shared: null,
      cretated_at: new Date(),
      modified_at: null,
    };

    this.items.push(question);

    return question;
  }

  async findAll() {
    return this.items;
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id === id);

    if (!question) {
      return null;
    }

    return question;
  }
}
