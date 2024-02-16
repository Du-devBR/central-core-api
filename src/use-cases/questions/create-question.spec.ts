import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";

let questionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Question use case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(questionsRepository);
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
