import type {
  Response} from "@remix-run/node";
import {
  installGlobals
} from "@remix-run/node";
import { expect } from "vitest";

installGlobals();

expect.extend({
  async toBeResponseLike(received: Response, expected: any) {
    const { isNot } = this;
    let data = { ...await received.json() };
    const assertObjects = Object.keys({ ...expected }).every((key) => {
      return data[key] === expected[key];
    });
    return {
      pass: assertObjects,
      message: () =>
        `Response is${isNot ? " not" : ""} equal to ${JSON.stringify(expected)}`,
      expected,
      actual: data,
    };
  },
  async toBeThwownErrorLike(received: any, expected: { message: string; status: number}) {
    const { isNot } = this;
    const responseError = received as Response;
    const data = await responseError.json();
    const assertMessage = data.message === expected.message;
    const assertStatus = responseError.status === expected.status;
    return {
      pass: assertMessage && assertStatus,
      message: () =>
        `Thrown error is${isNot ? " not" : ""} equal to ${JSON.stringify(expected)}`,
      expected,
      actual: data,
    };
  }
});
