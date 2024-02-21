import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";
import { GetByIdQuestionUseCase } from "./get-by-id-question";

let questionRepository: InMemoryQuestionsRepository;
let sut: GetByIdQuestionUseCase;

describe("Get question by id use case", () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository();
    sut = new GetByIdQuestionUseCase(questionRepository);
  });

  it("should return question by given id", async () => {
    const question1 = await questionRepository.create({
      title: "Question 1",
      content: "Content 1",
      user_id: "user1",
    });

    const questionById = question1.id;

    const questionId = await sut.execute({ id: questionById });

    expect(questionId.question).toEqual(question1);
  });
});
