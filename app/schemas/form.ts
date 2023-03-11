import { z } from "zod";
import { ColorSchema } from "./color";

export const FormColorSchema = (
  resource: "convert" | "blend" | "shades" | "palette",
  format: "hex" | "rgb" | "hsl" | "cmyk"
) => {
  const colorSchema = ColorSchema[format];
  return resource === "blend"
    ? z.object({ color: colorSchema, secondColor: colorSchema })
    : z.object({ color: colorSchema });
};