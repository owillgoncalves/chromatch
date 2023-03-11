import type { Formats, Resources } from "../client-types";

export const getPlaceholders = (resource: Resources, format: Formats) => {
  const placeholders = {
    hex: { color: "#000000" },
    rgb: { color: "rgb(0, 0, 0)" },
    hsl: { color: "hsl(0, 0%, 0%)" },
    cmyk: { color: "cmyk(0, 0, 0, 0)" },
  };
  return resource === "blend"
    ? { ...placeholders[format], secondColor: placeholders[format].color }
    : placeholders[format];
};
