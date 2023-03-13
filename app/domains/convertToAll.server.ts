import { collect, makeDomainFunction, pipe } from "domain-functions";
import { z } from "zod";
import { Formats } from "~/utils/client-types";
import { convert } from "./convert.server";
import { getColorValue } from "./getColorValue.server";

const bypassInputColor = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: z.string(),
      })
    ),
  })
)(async ({ colors }): Promise<{ colors: { color: string }[] }> => ({ colors }));

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
    hex: pipe(bypassInputColor, getColorValue),
    rgb: pipe(convert.fromHexToRgb, getColorValue),
    hsl: pipe(convert.fromHexToRgb, convert.fromRgbToHsl, getColorValue),
    cmyk: pipe(convert.fromHexToRgb, convert.fromRgbToCmyk, getColorValue),
  }),
  rgb: collect({
    resource: checkIfResourceIsConvert,
    hex: pipe(convert.fromRgbToHex, getColorValue),
    rgb: pipe(bypassInputColor, getColorValue),
    hsl: pipe(convert.fromRgbToHsl, getColorValue),
    cmyk: pipe(convert.fromRgbToCmyk, getColorValue),
  }),
  hsl: collect({
    resource: checkIfResourceIsConvert,
    hex: pipe(convert.fromHslToRgb, convert.fromRgbToHex, getColorValue),
    rgb: pipe(convert.fromHslToRgb, getColorValue),
    hsl: pipe(bypassInputColor, getColorValue),
    cmyk: pipe(convert.fromHslToRgb, convert.fromRgbToCmyk, getColorValue),
  }),
  cmyk: collect({
    resource: checkIfResourceIsConvert,
    hex: pipe(convert.fromCmykToRgb, convert.fromRgbToHex, getColorValue),
    rgb: pipe(convert.fromCmykToRgb, getColorValue),
    hsl: pipe(convert.fromCmykToRgb, convert.fromRgbToHsl, getColorValue),
    cmyk: pipe(bypassInputColor, getColorValue),
  }),
};
