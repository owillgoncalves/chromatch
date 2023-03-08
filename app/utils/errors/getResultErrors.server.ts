import type { ErrorResult } from "domain-functions";

export const getResultErrors = (result: ErrorResult) => {
  const errors = [...result.inputErrors, ...result.errors];
  return errors.map((error) => error.message).join("\n\n");
};