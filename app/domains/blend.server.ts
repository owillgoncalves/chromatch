import { makeDomainFunction, collect, pipe } from "domain-functions";
import { z } from "zod";
import { ColorSchema } from "~/schemas/color";
import { blendRgbColors } from "~/utils/colors/blend.server";
import { convert } from "./convert.server";

const blendColors = makeDomainFunction(
  z.object({
    color: ColorSchema.rgb,
    secondColor: ColorSchema.rgb,
  })
)(
  async (input): Promise<{ color: string }> => ({
    color: blendRgbColors(input.color, input.secondColor),
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
    color: pipe(convert.fromHexToRgb, blendColors, convert.fromRgbToHex),
  }),
  rgb: collect({
    resource: checkIfBlendIsTheResource,
    color: blendColors,
  }),
  hsl: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(convert.fromHslToRgb, blendColors, convert.fromRgbToHsl),
  }),
  cmyk: collect({
    resource: checkIfBlendIsTheResource,
    color: pipe(convert.fromCmykToRgb, blendColors, convert.fromRgbToCmyk),
  }),
};
