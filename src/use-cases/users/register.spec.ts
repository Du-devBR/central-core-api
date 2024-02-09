import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists-error";
import { NonStandardPasswordError } from "../exceptions/non-standard-password-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    // system under test
    sut = new RegisterUseCase(usersRepository);
  });
  it("should to register", async () => {
    const { user } = await sut.execute({
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "1@Abcdefg",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to register with same email twice", async () => {
    const email = "john@example.com";

    await sut.execute({
      name: "John",
      lastname: "Doe",
      email,
      password: "1@Abcdefg",
    });

    await expect(() =>
      sut.execute({
        name: "John",
        lastname: "Doe",
        email,
        password: "1@Abcdefg",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("Should not register a password if not you are in the pattern of '@Aa1' and more than eight characters ", async () => {
    const password = "12345678";

    await expect(
      sut.execute({
        name: "John",
        lastname: "Doe",
        email: "john@example.com",
        password,
      }),
    ).rejects.toBeInstanceOf(NonStandardPasswordError);
  });
});
