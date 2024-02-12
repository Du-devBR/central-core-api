import { UsersRespository } from "@/respositories/interfaces/users-repository-interface";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists-error";
import { regexValidatePassword } from "@/utils/regex-validate-password";
import { NonStandardPasswordError } from "../exceptions/non-standard-password-error";
import { SendEmailInterface } from "@/respositories/interfaces/send-email-interface";
import { TokenConfirmeAccountUseCase } from "../token/token-confirme-account-use-case";

interface RegisterUseCaseRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  private usersRepository: UsersRespository;
  private sendEmailService: SendEmailInterface;
  private tokenConfirmeAccountUseCase: TokenConfirmeAccountUseCase;

  constructor(
    usersRepository: UsersRespository,
    sendEmailService: SendEmailInterface,
    tokenConfirmeAccountUseCase: TokenConfirmeAccountUseCase,
  ) {
    this.usersRepository = usersRepository;
    this.sendEmailService = sendEmailService;
    this.tokenConfirmeAccountUseCase = tokenConfirmeAccountUseCase;
  }

  async execute({
    name,
    lastname,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    if (!regexValidatePassword(password)) {
      throw new NonStandardPasswordError();
    }
    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      lastname,
      email,
      password_hash,
    });

    const token = this.tokenConfirmeAccountUseCase.generateToken(user.id);

    await this.sendEmailService.sendEmail(email, token);

    return {
      user,
    };
  }
}
