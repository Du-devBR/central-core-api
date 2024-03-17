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
    // const { question } = await sut.execute({
    //   title: "John",
    //   content: "Doe",
    //   userId: "1235",
    // });
    // expect(question.id).toEqual(expect.any(String));

    const { answer } = await sut.execute({
      userId: "a",
      questionId: "b",
      content: "test",
    });

    expect(answer.id).toEqual(expect.any(String));
  });
});
