import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists-error";
import { NonStandardPasswordError } from "../exceptions/non-standard-password-error";
import { TokenConfirmeAccountUseCase } from "../token/token-confirme-account-use-case";
import { InMemorySendEmailRepository } from "@/respositories/in-memory/in-memory-send-email-repository";
import { $Enums } from "@prisma/client";

let usersRepository: InMemoryUsersRepository;
let sendEmailUseCase: InMemorySendEmailRepository;
let tokenUseCase: TokenConfirmeAccountUseCase;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sendEmailUseCase = new InMemorySendEmailRepository();
    // tokenUseCase = new TokenConfirmeAccountUseCase();
    tokenUseCase = {
      generateToken: () => "generatedToken",
    };
    // system under test
    sut = new RegisterUseCase(usersRepository, sendEmailUseCase, tokenUseCase);
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

  it("should generate a token with the user id", async () => {
    const { user } = await sut.execute({
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "1@Abcdefg",
    });

    expect(tokenUseCase.generateToken(user.id)).toEqual("generatedToken");
  });

  it("should send email to confirmation account", async () => {
    const { user } = await sut.execute({
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "1@Abcdefg",
    });

    expect(sendEmailUseCase.emailSent(user.email)).toBe(true);
  });

  it("should be possible to update the email status", async () => {
    const { user } = await sut.execute({
      name: "John",
      lastname: "Doe",
      email: "john@example.com",
      password: "1@Abcdefg",
    });

    const updatedUser = await usersRepository.updateCheckedStatus(user.id);
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.email_status).toEqual($Enums.EmailCheck.CKECKED);
  });
});
