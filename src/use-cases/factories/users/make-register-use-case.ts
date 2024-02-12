import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-repository";
import { SendEmailConfirmAccount } from "@/use-cases/email/send-email-confirm-account";
import { TokenConfirmeAccountUseCase } from "@/use-cases/token/token-confirme-account-use-case";
import { RegisterUseCase } from "@/use-cases/users/register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const sendEmailUseCase = new SendEmailConfirmAccount();
  const tokenUseCase = new TokenConfirmeAccountUseCase();
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    sendEmailUseCase,
    tokenUseCase,
  );

  return registerUseCase;
}
