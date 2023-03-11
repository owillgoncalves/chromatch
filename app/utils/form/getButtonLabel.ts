import type { Formats, Resources } from "../client-types";

export const getButtonLabel = (resource: Resources, format: Formats) => {
  const fixedLabels = {
    blend: `BLEND ${format.toUpperCase()} COLORS`,
    convert: `CONVERT ${format.toUpperCase()} COLOR`,
  };
  return resource === "blend" || resource === "convert"
    ? fixedLabels[resource]
    : `GENERATE ${resource.toUpperCase()} FROM ${format.toUpperCase()} COLOR`;
};
