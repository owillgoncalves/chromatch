import type { Resources } from "../client-types";

export const getSuccessPath = (
  resource: Resources,
  color: FormDataEntryValue | null,
  secondColor?: FormDataEntryValue | null
) => {
  const colorSearchParams = new URLSearchParams();
  if (color) {
    colorSearchParams.append("color", color.toString());
  }
  if (secondColor) {
    colorSearchParams.append("secondColor", secondColor.toString());
  }
  switch (resource) {
    case "convert":
      return `from?${colorSearchParams.toString()}`;
    case "blend":
      return `with?${colorSearchParams.toString()}`;
    case "palette":
      return `output?${colorSearchParams.toString()}`;
    case "shades":
      return `of?${colorSearchParams.toString()}`;
  }
};