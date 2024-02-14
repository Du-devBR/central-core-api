import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRespository } from "../interfaces/users-repository-interface";

/**
 * User repository deployment
 * @implements {UsersRespository}
 */
export class PrismaUsersRepository implements UsersRespository {
  /**
   * Find by id registered
   * @param {string} id - Parameter type string
   */
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  /**
   * Find by email registered
   * @param {string} email - Parameter type string
   */

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  /**
   * Create user in database
   * @param {Prisma.UserCreateInput} data - Parameter data for create a user
   */

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  /**
   * Update email_staus user in database
   * @param {string} id - Parameter id type string for update
   */

  async updateCheckedStatus(id: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: { email_status: "CKECKED" },
    });

    return user;
  }
}
