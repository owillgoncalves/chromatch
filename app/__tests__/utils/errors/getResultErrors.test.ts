import type { ErrorResult } from "domain-functions";
import { describe, expect, test } from "vitest";
import { getResultErrors } from "~/utils/errors/getResultErrors.server";

describe("getResultErrors", async () => {
  test("should return a string", async () => {
    const result: ErrorResult = {
      inputErrors: [
        {
          message: "Some nice input error message",
          path: [""],
        },
      ],
      errors: [
        {
          message: "Some nice error message",
          exception: new Error("Some nice error message"),
        }
      ],
      environmentErrors: [],
      success: false,
    };
    const errors = getResultErrors(result);
    expect(typeof errors).toBe("string");
    expect(errors).toBe(
      "Some nice input error message\n\nSome nice error message"
    );
  });
});
