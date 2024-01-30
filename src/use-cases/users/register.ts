import { UsersRespository } from "@/respositories/interfaces/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  lastname: string;
  email: string;
  github: string;
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRespository) {}

  async execute({ name, lastname, github, email }: RegisterUseCaseRequest) {
    await this.usersRepository.create({
      name,
      email,
      github,
      lastname,
    });
  }
}
