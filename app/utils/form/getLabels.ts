import type { Formats, Resources } from "../client-types";

export const getLabels = (resource: Resources, format: Formats) => {
  const defaultLabel = (format: "hex" | "rgb" | "hsl" | "cmyk") =>
    `Insert a ${format.toUpperCase()} color`;
  const labels = {
    hex: { color: defaultLabel("hex") },
    rgb: { color: defaultLabel("rgb") },
    hsl: { color: defaultLabel("hsl") },
    cmyk: { color: defaultLabel("cmyk") },
  };
  return resource === "blend"
    ? {
        ...labels[format],
        secondColor: `Insert a second ${format.toUpperCase()} color`,
      }
    : labels[format];
};
