import { collect, makeDomainFunction, pipe } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import { convert } from "./convert.server";

const PaletteSchema = z.object({
  colors: z
    .array(
      z.object({
        color: ColorSchema.hsl,
      })
    )
    .refine((value) => value.length === 1, {
      message: "You can generate palettes only for one color at a time",
    }),
});

const normalizeHue = (h: number) => {
  if (h < 0) {
    return 360 + h;
  }
  if (h > 360) {
    return h - 360;
  }
  return h;
};

const normalizeSaturation = (s: number) => {
  if (s < 0) {
    return 0;
  }
  if (s > 100) {
    return 100;
  }
  return s;
};

const normalizeLightness = (l: number) => {
  if (l < 0) {
    return 0;
  }
  if (l > 100) {
    return 100;
  }
  return l;
};

const generatePalette = (
  color: string,
  hueVariation: number[],
  saturationVariation: number[],
  lightnessVariation: number[]
) => {
  const [h, s, l] = color.match(/\d+/g)!.map(Number);
  return {
    colors: Array.from({ length: 5 }, (_, i) => ({
      color: `hsl(${normalizeHue(h + hueVariation[i])}, ${normalizeSaturation(
        s + saturationVariation[i]
      )}%, ${normalizeLightness(l + lightnessVariation[i])}%)`,
    })),
  };
};

const analogue = makeDomainFunction(PaletteSchema)(
  async ({ colors: [{ color }] }): Promise<{ colors: { color: string }[] }> =>
    generatePalette(
      color,
      [-32, -16, 0, 16, 32],
      [5, 5, 0, 5, 5],
      [1, -9, 0, -9, 1]
    )
);

const monochromatic = makeDomainFunction(PaletteSchema)(
  async ({ colors: [{ color }] }): Promise<{ colors: { color: string }[] }> =>
    generatePalette(
      color,
      [0, 0, 0, 0, 0],
      [5, -10, 0, -10, 5],
      [-15, -7, 0, 5, 10]
    )
);

const triad = makeDomainFunction(PaletteSchema)(
  async ({ colors: [{ color }] }): Promise<{ colors: { color: string }[] }> =>
    generatePalette(
      color,
      [-59, 0, 0, 203, 203],
      [-10, 10, 0, 10, 5],
      [0, -20, 0, 0, -20]
    )
);

export const palette = {
  rgb: pipe(
    convert.fromRgbToHsl,
    collect({
      analogue: pipe(analogue, convert.fromHslToRgb),
      monochromatic: pipe(monochromatic, convert.fromHslToRgb),
      triad: pipe(triad, convert.fromHslToRgb),
    })
  ),
  hex: pipe(
    convert.fromHexToRgb,
    convert.fromRgbToHsl,
    collect({
      analogue: pipe(analogue, convert.fromHslToRgb, convert.fromRgbToHex),
      monochromatic: pipe(
        monochromatic,
        convert.fromHslToRgb,
        convert.fromRgbToHex
      ),
      triad: pipe(triad, convert.fromHslToRgb, convert.fromRgbToHex),
    })
  ),
  hsl: collect({
    analogue,
    monochromatic,
    triad,
  }),
  cmyk: pipe(
    convert.fromCmykToRgb,
    convert.fromRgbToHsl,
    collect({
      analogue: pipe(analogue, convert.fromHslToRgb, convert.fromRgbToCmyk),
      monochromatic: pipe(
        monochromatic,
        convert.fromHslToRgb,
        convert.fromRgbToCmyk
      ),
      triad: pipe(triad, convert.fromHslToRgb, convert.fromRgbToCmyk),
    })
  ),
};
