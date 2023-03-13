import { collect, makeDomainFunction, pipe } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import { convert } from "./convert.server";

const getShades = makeDomainFunction(
  z.object({
    colors: z
      .array(
        z.object({
          color: ColorSchema.hsl,
        })
      )
      .refine((value) => value.length === 1, {
        message: "You can generate shades only for one color at a time",
      }),
  })
)(async ({ colors: [{ color }] }): Promise<{ colors: { color: string }[] }> => {
  const shades = [];
  const [h, s] = color.match(/\d+/g)!.map(Number);
  for (let i = 0; i < 9; i++) {
    shades.push({ color: `hsl(${h}, ${s}%, ${(i + 1) * 10}%)` });
  }
  return {
    colors: shades,
  };
});

const getShadesObjectFromArray = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: z.string(),
      })
    ),
  })
)(async ({ colors }): Promise<{ shades: Record<number, string> }> => {
  const shades = {};
  colors.forEach((shade, index) => {
    Object.assign(shades, { [`${(index + 1) * 100}`]: shade.color });
  });
  return { shades };
});

const checkIfResourceIsShades = makeDomainFunction(
  z.object({
    resource: z.string().refine((value) => value === "shades", {
      message: "must be equal to 'shades'",
    }),
  })
)(async (input): Promise<string> => input.resource);

export const shades = {
  hex: collect({
    resource: checkIfResourceIsShades,
    color: pipe(
      convert.fromHexToRgb,
      convert.fromRgbToHsl,
      getShades,
      convert.fromHslToRgb,
      convert.fromRgbToHex,
      getShadesObjectFromArray
    ),
  }),
  rgb: collect({
    resource: checkIfResourceIsShades,
    color: pipe(
      convert.fromRgbToHsl,
      getShades,
      convert.fromHslToRgb,
      getShadesObjectFromArray
    ),
  }),
  hsl: collect({
    resource: checkIfResourceIsShades,
    color: getShades,
  }),
  cmyk: collect({
    resource: checkIfResourceIsShades,
    color: pipe(
      convert.fromCmykToRgb,
      convert.fromRgbToHsl,
      getShades,
      convert.fromHslToRgb,
      convert.fromRgbToCmyk,
      getShadesObjectFromArray
    ),
  }),
};
