import jwt from "jsonwebtoken";
import { env } from "@/env";

export class TokenUseCase {
  generateToken(userId: string): string {
    const token = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }
}
