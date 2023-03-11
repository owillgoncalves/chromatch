export const blendRgbColors = (color1: string, color2: string) => {
  const rgbStringToValues = (rgbString: string) => {
    const rgbArray = rgbString.slice(4, -1).split(",").map(Number);
    return { r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] };
  };
  const valuesToRgbString = ({
    r,
    g,
    b,
  }: {
    r: number;
    g: number;
    b: number;
  }) => {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };
  const color1Values = rgbStringToValues(color1);
  const color2Values = rgbStringToValues(color2);
  const r = 0.5 * color1Values.r + 0.5 * color2Values.r;
  const g = 0.5 * color1Values.g + 0.5 * color2Values.g;
  const b = 0.5 * color1Values.b + 0.5 * color2Values.b;
  return valuesToRgbString({ r, g, b });
};
