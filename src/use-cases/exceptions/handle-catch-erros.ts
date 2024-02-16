export class HandleCatchError extends Error {
  constructor() {
    super("error when making request, check your request");
  }
}
