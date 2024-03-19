import { beforeEach, describe, expect, it } from "vitest";
import { GetAllAnswerInQuestionUseCase } from "./get-all-answer-parent-in-question";
import { InMemoryAnswerRepository } from "@/respositories/in-memory/in-memory-answer-repository";
import { InMemoryQuestionsRepository } from "@/respositories/in-memory/in-memory-questions-repository";

let answersRepository: InMemoryAnswerRepository;
let questionRepository: InMemoryQuestionsRepository;
let sut: GetAllAnswerInQuestionUseCase;

describe("Get all answer in the question use case", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswerRepository();
    questionRepository = new InMemoryQuestionsRepository();
    sut = new GetAllAnswerInQuestionUseCase(answersRepository);
  });

  it("should return all answers in the question", async () => {
    const question1 = await questionRepository.create({
      title: "Question 1",
      content: "Content 1",
      user_id: "user1",
    });

    await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "teste",
    });

    await answersRepository.create({
      user_id: "a",
      question_id: question1.id,
      content: "teste",
    });

    const { answers } = await sut.execute({
      questionId: question1.id,
    });

    expect(answers.length).toEqual(2);
    expect(answers[0].question_id).toEqual(question1.id);
    expect(answers[1].question_id).toEqual(question1.id);
  });
});
