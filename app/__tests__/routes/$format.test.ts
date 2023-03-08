import { describe, expect, test } from "vitest";
import { declareFetchOnGlobalThis } from "~/utils/tests/declareFetchOnGlobalThis.server";
import { loader } from "~/routes/$format";
import { formats } from "~/domains/formatIsValid.server";

describe("format loader", () => {
  declareFetchOnGlobalThis();
  test("loader should return the format when it exists", async () => {
    const format = formats[Math.floor(Math.random() * formats.length)];
    const response = await loader({
      request: new Request(`http://localhost:3000/${format}`),
      params: { format },
      context: {},
    });
    await expect(response).toBeResponseLike({ format });
  });

  test("loader should throw an error when the format does not exist", async () => {
    try {
      await loader({
        request: new Request("http://localhost:3000/invalid"),
        params: { format: "invalid" },
        context: {},
      });
    } catch (error) {
      await expect(error).toBeThwownErrorLike({
        message:
          'Invalid format. Valid formats are: "hex", "rgb", "hsl", "cmyk". Please try again.',
        status: 400,
      });
    }
  });
});
