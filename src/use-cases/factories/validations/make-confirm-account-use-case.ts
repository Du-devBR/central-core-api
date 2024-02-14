import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-repository";
import { ConfirmAccountUser } from "@/use-cases/validations/confirm-account-use-case";

export function makeConfirmAccountUseCase() {
  /**
   * Factory for create an instance of confirmAccountUseCase with prisma respository PrismaUsersRepository
   * @returns {ConfirmAccountUser}
   */
  const userRepository = new PrismaUsersRepository();

  const confirmAccountUseCase = new ConfirmAccountUser(userRepository);

  return confirmAccountUseCase;
}
