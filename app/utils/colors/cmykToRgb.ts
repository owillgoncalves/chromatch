export const cmykToRgb = (cmykColor: string) => {
  const cmykValues = cmykColor
    .substring(5, cmykColor.length - 1)
    .split(",")
    .map((value) => value.match(/\d+/g))
  const c = Number(cmykValues[0]) / 100;
  const m = Number(cmykValues[1]) / 100;
  const y = Number(cmykValues[2]) / 100;
  const k = Number(cmykValues[3]) / 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return `rgb(${r}, ${g}, ${b})`;
};