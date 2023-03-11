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
    const [r, g, b] = arg.match(/\d+/g)!.map(Number);
    if (r < 0 || r > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 255",
        path: ["red"],
      });
    }
    if (g < 0 || g > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 255",
        path: ["green"],
      });
    }
    if (b < 0 || b > 255) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 255",
        path: ["blue"],
      });
    }
  });

const HslColor = z
  .string()
  .regex(/^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/, {
    message: "Invalid hsl value",
  })
  .superRefine((arg, ctx) => {
    const [h, s, l] = arg.match(/\d+/g)!.map(Number);
    if (h < 0 || h > 360) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 360",
        path: ["hue"],
      });
    }
    if (s < 0 || s > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["saturation"],
      });
    }
    if (l < 0 || l > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["lightness"],
      });
    }
  });

const CmykColor = z
  .string()
  .regex(/^cmyk\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, {
    message: "Invalid cmyk value",
  }).superRefine((arg, ctx) => {
    const [c, m, y, k] = arg.match(/\d+/g)!.map(Number);
    if (c < 0 || c > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["cyan"],
      });
    }
    if (m < 0 || m > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["magenta"],
      });
    }
    if (y < 0 || y > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["yellow"],
      });
    }
    if (k < 0 || k > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be between 0 and 100",
        path: ["black"],
      });
    }
  });

export const ColorSchema = {
  hex: HexColor,
  rgb: RgbColor,
  hsl: HslColor,
  cmyk: CmykColor,
};
