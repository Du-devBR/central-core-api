import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";
import { GetByTextTypedQuestionUseCase } from "./get-by-text-typed";

let questionRepository: InMemoryQuestionsRepository;
let sut: GetByTextTypedQuestionUseCase;

describe("Get question by text typed use case", () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository();
    sut = new GetByTextTypedQuestionUseCase(questionRepository);
  });

  it("should return question by given text typed", async () => {
    await questionRepository.create({
      title: "Question 1",
      content: "Content 1",
      user_id: "user1",
    });

    await questionRepository.create({
      title: "Question 1",
      content: "content 2",
      user_id: "user1",
    });

    const inputText = "io";

    const result = await sut.execute({ text: inputText });

    expect(result.question).toHaveLength(2);
  });
});
