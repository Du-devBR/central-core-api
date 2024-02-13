import { UsersRespository } from "@/respositories/interfaces/users-repository-interface";

export class ConfirmAccountUser {
  private userRepository: UsersRespository;

  constructor(userRepository: UsersRespository) {
    this.userRepository = userRepository;
  }

  async execute(id: string) {
    const user = await this.userRepository.updateCheckedStatus(id);

    return {
      user,
    };
  }
}
