import { describe, expect, test } from "vitest";
import { declareFetchOnGlobalThis } from "~/utils/tests/declareFetchOnGlobalThis.server";
import { loader } from "~/routes/$format/$resource";
import { resources } from "~/domains/resourceIsValid.server";

describe("Resource loader", () => {
  declareFetchOnGlobalThis();
  test("loader should return the resource when it exists", async () => {
    const resource = resources[Math.floor(Math.random() * resources.length)];
    const response = await loader({
      request: new Request(`http://localhost:3000/${resource}`),
      params: { resource },
      context: {},
    });
    await expect(response).toBeResponseLike({ resource });
  });

  test("loader should throw an error when the resource does not exist", async () => {
    try {
      await loader({
        request: new Request("http://localhost:3000/invalid"),
        params: { resource: "invalid" },
        context: {},
      });
    } catch (error) {
      await expect(error).toBeThwownErrorLike({
        message:
          'Invalid resource. Valid resources are: "blend", "convert", "palette", "shades". Please try again.',
        status: 400,
      });
    }
  });
});
