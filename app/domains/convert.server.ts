import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import {
  cmykToRgb,
  convertColors,
  hexToRgb, //
  hslToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl, //
} from "~/utils/colors/convert.server";

export const formats = ["hex", "rgb", "hsl", "cmyk"];

const fromHexToRgb = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.hex,
        secondColor: ColorSchema.hex.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((hex) => convertColors(hex, hexToRgb)),
}));

const fromRgbToHsl = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.rgb,
        secondColor: ColorSchema.rgb.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((rgb) => convertColors(rgb, rgbToHsl)),
}));

const fromHslToRgb = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.hsl,
        secondColor: ColorSchema.hsl.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((hsl) => convertColors(hsl, hslToRgb)),
}));

const fromCmykToRgb = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.cmyk,
        secondColor: ColorSchema.cmyk.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((cmyk) => convertColors(cmyk, cmykToRgb)),
}));

const fromRgbToHex = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.rgb,
        secondColor: ColorSchema.rgb.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((rgb) => convertColors(rgb, rgbToHex)),
}));

const fromRgbToCmyk = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.rgb,
        secondColor: ColorSchema.rgb.optional(),
      })
    ),
  })
)(async ({ colors }) => ({
  colors: colors.map((rgb) => convertColors(rgb, rgbToCmyk)),
}));

export const convert = {
  fromCmykToRgb,
  fromHexToRgb,
  fromHslToRgb,
  fromRgbToCmyk,
  fromRgbToHex,
  fromRgbToHsl,
};
