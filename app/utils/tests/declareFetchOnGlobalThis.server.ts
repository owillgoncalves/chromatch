import { fetch, Headers, Request, Response } from "@remix-run/node";

export function declareFetchOnGlobalThis() {
  if (!globalThis.fetch) {
    globalThis.Headers = Headers;
    // @ts-ignore
    globalThis.Response = Response;
    // @ts-ignore
    globalThis.Request = Request;
    // @ts-ignore
    globalThis.fetch = fetch;
  }
}