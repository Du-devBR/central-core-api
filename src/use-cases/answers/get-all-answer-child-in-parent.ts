import { AnswersRepository } from "@/respositories/interfaces/answers-repository-interface";
import { Answer } from "@prisma/client";

interface AnswerUseCaseRequest {
  questionId: string;
  parentId: string;
}
interface AnswerUseCaseResponse {
  answers: Answer[];
}

export class GetAllAnswerChildInParentUseCase {
  private answersRepository: AnswersRepository;

  constructor(answersRepository: AnswersRepository) {
    this.answersRepository = answersRepository;
  }

  /**
   * Execute the use case for find all answers child to the answer parent

   * @returns {Promise<AnswerUseCaseResponse>} - server response all answers child
   */

  async execute({
    questionId,
    parentId,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answers = await this.answersRepository.findAllAnswersChildInTheParent(
      questionId,
      parentId,
    );

    return {
      answers,
    };
  }
}
