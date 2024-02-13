export class TokenIsMissingError extends Error {
  constructor() {
    super("token is missing!");
  }
}
