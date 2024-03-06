import { QuestionsRespository } from "@/respositories/interfaces/questions-repository-interface";
import { Question } from "@prisma/client";

interface QuestionUseCaseRequest {
  text: string;
}

interface QuestionsUseCaseResponse {
  question: Question[];
}

export class GetByTextTypedQuestionUseCase {
  private questionRepository: QuestionsRespository;

  constructor(questionsRepository: QuestionsRespository) {
    this.questionRepository = questionsRepository;
  }

  /**
   * Execute the use case for find question if contain text typed

   * @returns {Promise<QuestionUseCaseResponse>} - server response question
   */

  async execute({
    text,
  }: QuestionUseCaseRequest): Promise<QuestionsUseCaseResponse> {
    const question = await this.questionRepository.findByTextTyped(text);

    return {
      question,
    };
  }
}
