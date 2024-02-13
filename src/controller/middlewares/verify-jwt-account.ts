import { app } from "@/app";
import { TokenHasExpiredError } from "@/use-cases/exceptions/token-has-expired-error";
import { FastifyReply } from "fastify";

export async function verifyJwtAccount(reply: FastifyReply, token: string) {
  try {
    app.jwt.verify(token);
    return true;
  } catch (err) {
    const error = new TokenHasExpiredError();
    reply.code(401).send({ message: error.message });

    return false;
  }
}
