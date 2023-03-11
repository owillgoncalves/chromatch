import type { ErrorResult, SchemaError } from "domain-functions";

export const getResultErrors = (result: ErrorResult) => {
  const mappedErrors: SchemaError[] = result.errors.map((error) => ({
    message: error.message,
    path: ["Scope"]
  }))
  const errors = [...result.inputErrors, ...mappedErrors];
  return errors.map(({ message, path }) => `${path}: ${message}`).join("\n\n");
};