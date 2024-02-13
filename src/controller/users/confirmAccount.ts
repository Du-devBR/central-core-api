import { makeConfirmAccountUseCase } from "@/use-cases/factories/validations/make-confirm-account-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { decode } from "jsonwebtoken";
import { z } from "zod";
import { verifyJwtAccount } from "../middlewares/verify-jwt-account";
import { TokenIsMissingError } from "@/use-cases/exceptions/token-is-missing-error";

export async function confirmAccount(req: FastifyRequest, reply: FastifyReply) {
  const tokenSchema = z.object({
    token: z.string(),
  });

  const jwtPayload = z.object({
    userId: z.string(),
  });
  const { token } = tokenSchema.parse(req.query);

  if (!token) {
    const err = new TokenIsMissingError();
    reply.code(400).send({ message: err.message });

    return;
  }
  try {
    const isTokenValid = await verifyJwtAccount(reply, token);

    if (isTokenValid) {
      const confirmAccountUseCase = makeConfirmAccountUseCase();
      const { userId } = jwtPayload.parse(decode(token));
      await confirmAccountUseCase.execute(userId);

      return reply
        .code(204)
        .send({ message: "Confirmation account user success." });
    }
  } catch (err) {
    return reply.code(400).send({ message: "Error validating user account" });
  }
}
