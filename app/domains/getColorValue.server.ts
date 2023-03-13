import { makeDomainFunction } from "domain-functions";
import { z } from "zod";

export const getColorValue = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: z.string(),
      })
    ),
  })
)(async ({ colors: [{ color }] }): Promise<string> => color);
