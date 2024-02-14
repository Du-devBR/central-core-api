import { UsersRespository } from "@/respositories/interfaces/users-repository-interface";

export class ConfirmAccountUser {
  private userRepository: UsersRespository;

  constructor(userRepository: UsersRespository) {
    this.userRepository = userRepository;
  }

  /**
   * Execute use case for validate user account
   * @param id - id type string is necessary in paramenter
   * @returns - server updates email_status
   */

  async execute(id: string) {
    const user = await this.userRepository.updateCheckedStatus(id);

    return {
      user,
    };
  }
}
