export class NonStandardPasswordError extends Error {
  constructor() {
    super(
      "Outside password must have '@Aa1' and be greater than eight characters.",
    );
  }
}
