import { AnswersRepository } from "@/respositories/interfaces/answers-repository-interface";
import { Answer } from "@prisma/client";

interface AnswerUseCaseRequest {
  userId: string;
  questionId: string;
  content: string;
  parentId?: string;
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
    parentId,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = await this.answerRepository.create({
      content,
      user_id: userId,
      question_id: questionId,
      parent_id: parentId || null,
    });

    return {
      answer,
    };
  }
}
