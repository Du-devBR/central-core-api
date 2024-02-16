import { TokenHasExpiredError } from "@/use-cases/exceptions/token-has-expired-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwtAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    const error = new TokenHasExpiredError();
    reply.code(401).send({ message: error.message });
  }
}
