import { makeDomainFunction, collect, pipe } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import { blendRgbColors } from "~/utils/colors/blend.server";
import { convert } from "./convert.server";
import { getColorValue } from "./getColorValue.server";

const blendColors = makeDomainFunction(
  z.object({
    colors: z.array(
      z.object({
        color: ColorSchema.rgb,
        secondColor: ColorSchema.rgb,
      })
    ),
  })
)(
  async ({ colors }): Promise<{ colors: { color: string }[] }> => ({
    colors: colors.map(({ color, secondColor }) => ({
      color: blendRgbColors(color, secondColor),
    })),
  })
);

const checkIfBlendIsTheResource = makeDomainFunction(
  z.object({
    resource: z.string().refine((value) => value === "blend", {
      message: "must be equal to 'blend'",
    }),
  })
)(async (input): Promise<string> => input.resource);

export const blend = {
  hex: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(convert.fromHexToRgb, blendColors, convert.fromRgbToHex, getColorValue),
  }),
  rgb: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(blendColors, getColorValue),
  }),
  hsl: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(convert.fromHslToRgb, blendColors, convert.fromRgbToHsl, getColorValue),
  }),
  cmyk: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(convert.fromCmykToRgb, blendColors, convert.fromRgbToCmyk, getColorValue),
  }),
};
