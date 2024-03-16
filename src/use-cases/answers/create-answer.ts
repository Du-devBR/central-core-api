import { AnswersRepository } from "@/respositories/interfaces/answers-repository-interface";
import { Answer } from "@prisma/client";

interface AnswerUseCaseRequest {
  userId: string;
  questionId: string;
  content: string;
}

interface AnswerUseCaseResponse {
  answer: Answer;
}

export class CreateAnswerUseCase {
  private answerRepository: AnswersRepository;

  constructor(answersRepository: AnswersRepository) {
    this.answerRepository = answersRepository;
  }

  /**
   * Execute the use case for user create a new answer to a question
   * @param {QuestionUseCaseRequest} - data required for create answer
   * @returns {Promise<QuestionUseCaseResponse>} - server response with Answer user
   */

  async execute({
    userId,
    content,
    questionId,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = await this.answerRepository.create({
      user_id: userId,
      content,
      question_id: questionId,
    });

    return {
      answer,
    };
  }
}
