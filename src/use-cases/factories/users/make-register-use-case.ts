import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-repository";
import { SendEmailConfirmAccount } from "@/use-cases/email/send-email-confirm-account";
import { TokenUseCase } from "@/use-cases/token/token-use-case";
import { RegisterUseCase } from "@/use-cases/users/register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const sendEmailService = new SendEmailConfirmAccount();
  const tokenService = new TokenUseCase();
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    sendEmailService,
    tokenService,
  );

  return registerUseCase;
}
