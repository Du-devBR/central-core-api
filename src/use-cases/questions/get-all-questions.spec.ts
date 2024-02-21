import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";
import { GetAllQuestionsUseCase } from "./get-all-questions";

let questionsRepository: InMemoryQuestionsRepository;
let sut: GetAllQuestionsUseCase;

describe("Get all Questions use case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new GetAllQuestionsUseCase(questionsRepository);
  });

  it("should return all questions", async () => {
    const question1 = await questionsRepository.create({
      title: "Question 1",
      content: "Content 1",
      user_id: "user1",
    });

    const question2 = await questionsRepository.create({
      title: "Question 2",
      content: "Content 2",
      user_id: "user2",
    });

    const { questions } = await sut.execute();

    expect(questions).toContainEqual(question1);
    expect(questions).toContainEqual(question2);
  });
});
