export class UserUnauthorizedError extends Error {
  constructor() {
    super("Unauthorized.");
  }
}
