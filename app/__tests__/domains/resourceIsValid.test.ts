import { describe, expect, test } from "vitest";
import { resourceIsValid, resources } from "~/domains/resourceIsValid.server";

describe("resourceIsValid domain function", () => {
  test("should return success result with the resource when it's valid", async () => {
    const resource = resources[Math.floor(Math.random() * resources.length)];
    expect(await resourceIsValid(resource)).toStrictEqual({
      data: resource,
      environmentErrors: [],
      errors: [],
      inputErrors: [],
      success: true,
    });
  });
  test("should return error result when the resource is invalid", async () => {
    expect(await resourceIsValid("invalid")).toStrictEqual({
      environmentErrors: [],
      errors: [],
      inputErrors: [
        {
          message:
            'Invalid resource. Valid resources are: "blend", "convert", "palette", "shades". Please try again.',
          path: [],
        },
      ],
      success: false,
    });
  });
});
