import { beforeEach, describe, expect, it } from "vitest";
import { CreateAnswerUseCase } from "./create-answer";
import { InMemoryAnswerRepository } from "@/respositories/in-memory/in-memory-answer-repository";

let answerRepository: InMemoryAnswerRepository;
let sut: CreateAnswerUseCase;

describe("Answer use case", () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository();
    sut = new CreateAnswerUseCase(answerRepository);
  });
  it("should to register new answer to the question", async () => {
    const { answer } = await sut.execute({
      userId: "a",
      questionId: "b",
      content: "test",
    });

    expect(answer.id).toEqual(expect.any(String));
  });

  it("should to register a new child answer through the parent answer", async () => {
    const parent1 = await answerRepository.create({
      user_id: "a",
      question_id: "b",
      content: "test",
    });

    const { answer } = await sut.execute({
      userId: "a",
      questionId: "b",
      content: "teste",
      parentId: parent1.id,
    });

    console.log(answer);

    expect(answer.parent_id).toEqual(parent1.id);
  });
});
