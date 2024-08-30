import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { AnswersRepository } from "../interfaces/answers-repository-interface";

/**
 * Answer repository deployment
 * @implements {AnswersRepository}
 */
export class PrismaAnswerRepository implements AnswersRepository {
  /**
   * Create answer in database
   * @param {Prisma.AnswerUncheckedCreateInput} data - Parameter data for create a answer
   */

  async create(data: Prisma.AnswerUncheckedCreateInput) {
    const answer = await prisma.answer.create({
      data,
    });

    return answer;
  }

  async findAllAnswersParentInTheQuestion(questionId: string) {
    const answers = await prisma.answer.findMany({
      where: {
        question_id: questionId,
      },
    });

    return answers;
  }

  async findAllAnswersChildInTheParent(questionId: string, parentId: string) {
    const answers = await prisma.answer.findMany({
      where: {
        question_id: questionId,
        parent_id: parentId,
      },
    });

    return answers;
  }
}
