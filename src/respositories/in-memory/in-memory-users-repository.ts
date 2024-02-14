import { $Enums, Prisma, User } from "@prisma/client";
import { UsersRespository } from "../interfaces/users-repository-interface";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRespository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password_hash: data.password_hash,
      github: null,
      email_status: $Enums.EmailCheck.UNCHECKED,
      cretated_at: new Date(),
      modified_at: null,
      role: $Enums.Role.MEMBER,
    };

    this.items.push(user);

    return user;
  }

  async updateCheckedStatus(id: string) {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    user.email_status = $Enums.EmailCheck.CKECKED;
    return user;
  }
}
