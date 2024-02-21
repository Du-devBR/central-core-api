import { QuestionsRespository } from "@/respositories/interfaces/questions-repository-interface";
import { Question } from "@prisma/client";

interface QuestionUseCaseRequest {
  id: string;
}

interface QuestionsUseCaseResponse {
  question: Question | null;
}

export class GetByIdQuestionUseCase {
  private questionRepository: QuestionsRespository;

  constructor(questionsRepository: QuestionsRespository) {
    this.questionRepository = questionsRepository;
  }

  /**
   * Execute the use case for find by id question

   * @returns {Promise<QuestionUseCaseResponse>} - server response question
   */

  async execute({
    id,
  }: QuestionUseCaseRequest): Promise<QuestionsUseCaseResponse> {
    const question = await this.questionRepository.findById(id);

    return {
      question,
    };
  }
}
