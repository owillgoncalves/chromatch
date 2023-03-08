import { describe, expect, test } from "vitest";
import { formatIsValid, formats } from "~/domains/formatIsValid.server";

describe("formatIsValid domain function", () => {
  test("should return success result with the format when it's valid", async () => {
    const format = formats[Math.floor(Math.random() * formats.length)];
    expect(await formatIsValid(format)).toStrictEqual({
      data: format,
      environmentErrors: [],
      errors: [],
      inputErrors: [],
      success: true,
    });
  });
  test("should return error result when the format is invalid", async () => {
    expect(await formatIsValid("invalid")).toStrictEqual({
      environmentErrors: [],
      errors: [],
      inputErrors: [
        {
          message:
            'Invalid format. Valid formats are: "hex", "rgb", "hsl", "cmyk". Please try again.',
          path: [],
        },
      ],
      success: false,
    });
  });
});
