import { collect, makeDomainFunction, pipe } from "domain-functions";
import { z } from "zod";
import { convert } from "./convert.server";

const bypassInputColor = makeDomainFunction(
  z.object({
    color: z.string(),
  })
)(
  async ({ color }): Promise<{ color: string }> => ({
    color,
  })
);

const checkIfResourceIsConvert = makeDomainFunction(
  z.object({
    resource: z.string().refine((value) => value === "convert", {
      message: "must be equal to 'convert'",
    }),
  })
)(async (input): Promise<string> => input.resource);

export const convertToAll = {
  hex: collect({
    resource: checkIfResourceIsConvert,
    hex: bypassInputColor,
    rgb: convert.fromHexToRgb,
    hsl: pipe(convert.fromHexToRgb, convert.fromRgbToHsl),
    cmyk: pipe(convert.fromHexToRgb, convert.fromRgbToCmyk),
  }),
  rgb: collect({
    resource: checkIfResourceIsConvert,
    hex: convert.fromRgbToHex,
    rgb: bypassInputColor,
    hsl: convert.fromRgbToHsl,
    cmyk: convert.fromRgbToCmyk,
  }),
  hsl: collect({
    resource: checkIfResourceIsConvert,
    hex: pipe(convert.fromHslToRgb, convert.fromRgbToHex),
    rgb: convert.fromHslToRgb,
    hsl: bypassInputColor,
    cmyk: pipe(convert.fromHslToRgb, convert.fromRgbToCmyk),
  }),
  cmyk: collect({
    resource: checkIfResourceIsConvert,
    hex: pipe(convert.fromCmykToRgb, convert.fromRgbToHex),
    rgb: convert.fromCmykToRgb,
    hsl: pipe(convert.fromCmykToRgb, convert.fromRgbToHsl),
    cmyk: bypassInputColor,
  }),
};
