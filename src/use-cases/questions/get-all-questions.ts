import { QuestionsRespository } from "@/respositories/interfaces/questions-repository-interface";
import { Question } from "@prisma/client";

interface QuestionsUseCaseResponse {
  question: Question[];
}

export class GetAllQuestionsUseCase {
  private questionsRepository: QuestionsRespository;

  constructor(questionsRepository: QuestionsRespository) {
    this.questionsRepository = questionsRepository;
  }

  /**
   * Execute the use case for find all questions

   * @returns {Promise<QuestionUseCaseResponse>} - server response all questions
   */

  async execute(): Promise<QuestionsUseCaseResponse> {
    const question = await this.questionsRepository.findAll();

    return {
      question,
    };
  }
}
