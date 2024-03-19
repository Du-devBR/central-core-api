import { AnswersRepository } from "@/respositories/interfaces/answers-repository-interface";
import { Answer } from "@prisma/client";

interface AnswerUseCaseRequest {
  questionId: string;
}
interface AnswerUseCaseResponse {
  answers: Answer[];
}

export class GetAllAnswerInQuestionUseCase {
  private answersRepository: AnswersRepository;

  constructor(answersRepository: AnswersRepository) {
    this.answersRepository = answersRepository;
  }

  /**
   * Execute the use case for find all answers to the question

   * @returns {Promise<AnswerUseCaseResponse>} - server response all answers
   */

  async execute({
    questionId,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answers =
      await this.answersRepository.findAllAnswersParentInTheQuestion(
        questionId,
      );

    return {
      answers,
    };
  }
}
