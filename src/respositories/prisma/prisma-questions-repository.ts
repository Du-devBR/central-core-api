import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { QuestionsRespository } from "../interfaces/questions-repository-interface";

/**
 * Question repository deployment
 * @implements {QuestionsRespository}
 */
export class PrismaQuestionsRepository implements QuestionsRespository {
  /**
   * Create question in database
   * @param {Prisma.UserUncheckedCreateInput} data - Parameter data for create a question
   */

  async create(data: Prisma.QuestionUncheckedCreateInput) {
    const question = await prisma.question.create({
      data,
    });

    return question;
  }

  async findAll() {
    const questions = await prisma.question.findMany();

    return questions;
  }

  async findById(id: string) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }

    return question;
  }

  async findByTextTyped(text: string) {
    const searchText = `%${text}`;
    const question = await prisma.question.findMany({
      where: {
        OR: [
          {
            title: {
              mode: "insensitive",
              contains: searchText,
            },
          },
          {
            content: {
              mode: "insensitive",
              contains: searchText,
            },
          },
        ],
      },
    });

    return question;
  }
}
