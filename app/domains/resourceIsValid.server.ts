import { makeDomainFunction } from "domain-functions";
import { z } from "zod";

export const resources = ["blend", "convert", "palette", "shades"];

export const resourceIsValid = makeDomainFunction(
  z.object({
    resource: z.string().refine((value) => resources.includes(value), {
      message: `Invalid resource. Valid resources are: ${resources
        .map((resource) => `"${resource}"`)
        .join(", ")}. Please try again.`,
    }),
  })
)(async (input) => input);
