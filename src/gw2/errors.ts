import { Symbols } from "./type.ts";

enum ErrorType {
  InvalidInput = "InvalidInput",
  NotFound = "NotFound",
}

type ExpectedType = "length" | "match";

export class InvalidInputError extends Error {
  input: string;
  expectedType: ExpectedType;

  constructor(
    expectedType: ExpectedType,
    input: string,
    valid: number | string,
  ) {
    super(
      `Expected ${expectedType}: ${valid}, got: ${
        expectedType === "length" ? input.length : input
      }`,
    );
    this.expectedType = expectedType;
    this.name = ErrorType.InvalidInput;
    this.input = input;
  }
}

export class NotFoundError extends Error {
  input: string[];
  valid: Symbols[] | string[];

  constructor(input: string[], valid: Symbols[]) {
    super(`Expected ${input.toString()} to be in ${valid.toString()}`);
    this.name = ErrorType.NotFound;
    this.input = input;
    this.valid = valid;
  }
}
