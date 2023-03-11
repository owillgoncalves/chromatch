import { makeDomainFunction } from "domain-functions";
import { z } from "zod";

export const formats = ["hex", "rgb", "hsl", "cmyk"];

export const formatIsValid = makeDomainFunction(
  z.object({
    format: z.string().refine((value) => formats.includes(value), {
      message: `Invalid format. Valid formats are: ${formats
        .map((format) => `"${format}"`)
        .join(", ")}. Please try again.`,
    }),
  })
)(async (input) => input);
