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

export const palette = {
  rgb: collect({
    analogue: pipe(convert.fromRgbToHsl, analogue, convert.fromHslToRgb),
  }),
  hex: collect({
    analogue,
  }),
  hsl: collect({
    analogue,
  }),
  cmyk: collect({
    analogue,
  }),
};

const test = [
  {
    "color": "rgb(219, 165, 248)"
  },
  {
    "color": "rgb(233, 118, 244)"
  },
  {
    "color": "rgb(245, 163, 230)"
  },
  {
    "color": "rgb(244, 118, 187)"
  },
  {
    "color": "rgb(248, 165, 189)"
  }
]
