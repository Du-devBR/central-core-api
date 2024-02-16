import { QuestionsRespository } from "@/respositories/interfaces/questions-repository-interface";
import { Question } from "@prisma/client";

interface QuestionUseCaseResponse {
  question: Question[];
}

export class GetAllQuestionsUseCase {
  private questionsRepository: QuestionsRespository;

  constructor(questionsRepository: QuestionsRespository) {
    this.questionsRepository = questionsRepository;
  }

  /**
   * Execute the use case for user registration

   * @returns {Promise<QuestionUseCaseResponse>} - server response with Questioned user
   */

  async execute(): Promise<QuestionUseCaseResponse> {
    const question = await this.questionsRepository.getAll();

    return {
      question,
    };
  }
}
