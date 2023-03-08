import type {
  Response} from "@remix-run/node";
import {
  installGlobals
} from "@remix-run/node";
import { expect } from "vitest";

installGlobals();

expect.extend({
  async toBeResponseLike(received: Response, expected: any) {
    let data = { ...await received.json() };
    const assertObjects = JSON.stringify(data) === JSON.stringify(expected);
    return {
      pass: assertObjects,
      message: () =>
        `Data don't match. Expected '${JSON.stringify(expected)}' but got '${JSON.stringify(data)}'`,
      expected,
      actual: data,
    };
  },
  async toBeThwownErrorLike(received: any, expected: { message: string; status: number}) {
    const responseError = received as Response;
    const data = await responseError.json();
    const assertMessage = data.message === expected.message;
    const assertStatus = responseError.status === expected.status;
    return {
      pass: assertMessage && assertStatus,
      message: () =>
        `Thrown error don't match. Expected '${JSON.stringify(expected)}' but got '${JSON.stringify(data)}'`,
      expected,
      actual: data,
    };
  }
});
