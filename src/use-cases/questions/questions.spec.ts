import { beforeEach, describe, expect, it } from "vitest";
import { QuestionUseCase } from "./questions";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";

let questionsRepository: InMemoryQuestionsRepository;
let sut: QuestionUseCase;

describe("Question use case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new QuestionUseCase(questionsRepository);
  });
  it("should to register new question", async () => {
    const { question } = await sut.execute({
      title: "John",
      content: "Doe",
      userId: "1235",
    });

    expect(question.id).toEqual(expect.any(String));
  });
});
