import { Prisma, User } from "@prisma/client";

export interface UsersRespository {
  create(data: Prisma.UserCreateInput): Promise<User>;
}
