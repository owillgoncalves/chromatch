import { collect, makeDomainFunction, pipe } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import { convert } from "./convert.server";

const getShades = makeDomainFunction(
  z.object({
    color: ColorSchema.hsl,
  })
)(
  async (input): Promise<{ shades: any }> => ({
    shades: getHslShades(input.color),
  })
);

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
    color: pipe(convert.fromHexToRgb, convert.fromRgbToHsl, getShades),
  }),
  rgb: collect({
    resource: checkIfResourceIsShades,
    color: pipe(convert.fromRgbToHsl, getShades),
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
      getShades
    ),
  }),
};

const getHslShades = (hslColor: string) => {
  const shades = {};
  const [h, s] = hslColor.match(/\d+/g)!.map(Number);
  for (let i = 0; i < 9; i++) {
    Object.assign(shades, {
      [(i + 1) * 100]: `hsl(${h}, ${s}%, ${(i + 1) * 10}%)`,
    });
  }
  return shades;
};
