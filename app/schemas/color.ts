import { z } from "zod";

const HexColor = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
  message: "Invalid hex value. Try something like #000000 or #000. The digits must be between 0 and F",
});

const RgbColor = z
  .string()
  .regex(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, {
    message: "Invalid rgb value",
  })
  .superRefine((arg, ctx) => {
    const [r,g,b] = arg
    .substring(4, arg.length - 1)
    .split(",")
    .map((value) => Number(value.trim()));
    if (r < 0 || r > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Red value must be between 0 and 255",
      });
    }
    if (g < 0 || g > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Green value must be between 0 and 255",
      });
    }
    if (b < 0 || b > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Blue value must be between 0 and 255",
      });
    }
  });

const HslColor = z
  .string()
  .regex(/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/, {
    message: "Invalid hsl value",
  })
  .superRefine((arg, ctx) => {
    const [h, s, l] = arg
      .substring(4, arg.length - 1)
      .replace(/%/g, "")
      .split(",")
      .map((value) => Number(value.trim()));
    if (h < 0 || h > 360) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Hue must be between 0 and 360",
      });
    }
    if (s < 0 || s > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Saturation must be between 0 and 100",
      });
    }
    if (l < 0 || l > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lightness must be between 0 and 100",
      });
    }
  });

const CmykColor = z
  .string()
  .regex(/^cmyk\((\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%\)$/, {
    message: "Invalid cmyk value",
  }).superRefine((arg, ctx) => {
    const [c, m, y, k] = arg
      .substring(5, arg.length - 1)
      .replace(/%/g, "")
      .split(",")
      .map((value) => Number(value.trim()));
    if (c < 0 || c > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cyan must be between 0 and 100",
      });
    }
    if (m < 0 || m > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Magenta must be between 0 and 100",
      });
    }
    if (y < 0 || y > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Yellow must be between 0 and 100",
      });
    }
    if (k < 0 || k > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Black must be between 0 and 100",
      });
    }
  });

export const ColorSchema = {
  hex: HexColor,
  rgb: RgbColor,
  hsl: HslColor,
  cmyk: CmykColor,
};
