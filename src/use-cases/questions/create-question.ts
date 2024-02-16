import { QuestionsRespository } from "@/respositories/interfaces/questions-repository-interface";
import { Question } from "@prisma/client";

interface QuestionUseCaseRequest {
  userId: string;
  title: string;
  content: string;
}

interface QuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  private questionsRepository: QuestionsRespository;

  constructor(questionsRepository: QuestionsRespository) {
    this.questionsRepository = questionsRepository;
  }

  /**
   * Execute the use case for user create a new question
   * @param {QuestionUseCaseRequest} - data required for create question
   * @returns {Promise<QuestionUseCaseResponse>} - server response with Questioned user
   */

  async execute({
    userId,
    title,
    content,
  }: QuestionUseCaseRequest): Promise<QuestionUseCaseResponse> {
    const question = await this.questionsRepository.create({
      user_id: userId,
      title,
      content,
    });

    return {
      question,
    };
  }
}
