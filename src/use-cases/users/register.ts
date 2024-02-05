import { UsersRespository } from "@/respositories/interfaces/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists-error";

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
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRespository) {}

  async execute({
    name,
    lastname,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      lastname,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
