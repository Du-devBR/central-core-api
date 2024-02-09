import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let useCase: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new RegisterUseCase(usersRepository);
  });
  it("should to register", async () => {
    const { user } = await useCase.execute({
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
