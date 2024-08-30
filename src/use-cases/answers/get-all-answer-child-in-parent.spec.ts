import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerRepository } from "@/respositories/in-memory/in-memory-answer-repository";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";
import { GetAllAnswerChildInParentUseCase } from "./get-all-answer-child-in-parent";

let answersRepository: InMemoryAnswerRepository;
let questionRepository: InMemoryQuestionsRepository;
let sut: GetAllAnswerChildInParentUseCase;

describe("Get all answer in the question use case", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository();
    questionRepository = new InMemoryQuestionsRepository();
    sut = new GetAllAnswerChildInParentUseCase(answersRepository);
  });

  it("should return all answers in the question", async () => {
    const question1 = await questionRepository.create({
      title: "Question 1",
      content: "Content 1",
      user_id: "user1",
    });

    const answer1 = await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "teste",
    });

    const answer2 = await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "teste",
    });

    await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "answer1",
      parent_id: answer1.id,
    });

    await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "answer1",
      parent_id: answer1.id,
    });

    await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "answer2",
      parent_id: answer2.id,
    });

    const { answers } = await sut.execute({
      questionId: question1.id,
      parentId: answer1.id,
    });

    expect(answers.length).toEqual(2);
  });
});
