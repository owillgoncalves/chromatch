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
    color: ColorSchema.hex,
    secondColor: ColorSchema.hex.optional(),
  })
)(async (hex) => convertColors(hex, hexToRgb));

const fromRgbToHsl = makeDomainFunction(
  z.object({
    color: ColorSchema.rgb,
    secondColor: ColorSchema.rgb.optional(),
  })
)(async (rgb) => convertColors(rgb, rgbToHsl));

const fromHslToRgb = makeDomainFunction(
  z.object({
    color: ColorSchema.hsl,
    secondColor: ColorSchema.hsl.optional(),
  })
)(async (hsl) => convertColors(hsl, hslToRgb));

const fromCmykToRgb = makeDomainFunction(
  z.object({
    color: ColorSchema.cmyk,
    secondColor: ColorSchema.cmyk.optional(),
  })
)(async (cmyk) => convertColors(cmyk, cmykToRgb));

const fromRgbToHex = makeDomainFunction(
  z.object({
    color: ColorSchema.rgb,
    secondColor: ColorSchema.rgb.optional(),
  })
)(async (rgb) => convertColors(rgb, rgbToHex));

const fromRgbToCmyk = makeDomainFunction(
  z.object({
    color: ColorSchema.rgb,
    secondColor: ColorSchema.rgb.optional(),
  })
)(async (rgb) => convertColors(rgb, rgbToCmyk));

export const convert = {
  fromCmykToRgb,
  fromHexToRgb,
  fromHslToRgb,
  fromRgbToCmyk,
  fromRgbToHex,
  fromRgbToHsl,
};
