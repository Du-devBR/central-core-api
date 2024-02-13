export class TokenHasExpiredError extends Error {
  constructor() {
    super("token has expired or is incorrect !");
  }
}
