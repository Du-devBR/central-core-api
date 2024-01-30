import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRespository } from "../interfaces/users-repository";

export class PrismaUsersRepository implements UsersRespository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
