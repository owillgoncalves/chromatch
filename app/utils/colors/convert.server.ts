export const convertColors = (
  input: { color: string; secondColor?: string },
  func: (color: string) => string
) => {
  const colors = {};
  Object.assign(colors, { color: func(input.color) });
  if (input.secondColor) {
    Object.assign(colors, { secondColor: func(input.secondColor) });
  }
  return colors;
};

export const hexToRgb = (hex: string) => {
  let hexColor = hex.replace("#", "");
  let r, g, b;
  if (hexColor.length === 3) {
    r = parseInt(hexColor[0] + hexColor[0], 16);
    g = parseInt(hexColor[1] + hexColor[1], 16);
    b = parseInt(hexColor[2] + hexColor[2], 16);
  } else {
    r = parseInt(hexColor.substring(0, 2), 16);
    g = parseInt(hexColor.substring(2, 4), 16);
    b = parseInt(hexColor.substring(4, 6), 16);
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgbToHsl = (rgbColor: string) => {
  const rgbValues = rgbColor
    .substring(4, rgbColor.length - 1)
    .split(",")
    .map(Number);
  const r = rgbValues[0] / 255;
  const g = rgbValues[1] / 255;
  const b = rgbValues[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / (max - min)) % 6;
  } else if (max === g) {
    h = (b - r) / (max - min) + 2;
  } else {
    h = (r - g) / (max - min) + 4;
  }
  h = Math.round(h * 60);
  const l = (max + min) / 2;
  let s;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = (max - min) / (max + min);
  } else {
    s = (max - min) / (2 - max - min);
  }
  s = Math.round(s * 100);
  return `hsl(${
    h < 0 ? h + 360 : h
  }, ${s}%, ${Math.round(l * 100)}%)`;
};

export const rgbToCmyk = (rgbColor: string) => {
  const rgbValues = rgbColor
    .substring(4, rgbColor.length - 1)
    .split(",")
    .map(Number);
  const r = rgbValues[0] / 255;
  const g = rgbValues[1] / 255;
  const b = rgbValues[2] / 255;
  let c = 1 - r;
  let m = 1 - g;
  let y = 1 - b;
  const k = Math.min(c, m, y);
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100
  )}%, ${Math.round(k * 100)}%)`;
};

export const cmykToRgb = (cmykColor: string) => {
  const cmykValues = cmykColor
    .substring(5, cmykColor.length - 1)
    .split(",")
    .map(Number);
  const c = cmykValues[0] / 100;
  const m = cmykValues[1] / 100;
  const y = cmykValues[2] / 100;
  const k = cmykValues[3] / 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return `rgb(${r}, ${g}, ${b})`;
};

export const hslToRgb = (hslColor: string) => {
  const hslValues = hslColor
    .substring(4, hslColor.length - 1)
    .split(",")
    .map((value) => {
      if (value.includes("%")) {
        return Number(value.replace("%", "")) / 100;
      } else {
        return Number(value);
      }
    });
  const h = hslValues[0];
  const s = hslValues[1];
  const l = hslValues[2];
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let rgbValues;
  if (huePrime >= 0 && huePrime <= 1) {
    rgbValues = [chroma, x, 0];
  } else if (huePrime > 1 && huePrime <= 2) {
    rgbValues = [x, chroma, 0];
  } else if (huePrime > 2 && huePrime <= 3) {
    rgbValues = [0, chroma, x];
  } else if (huePrime > 3 && huePrime <= 4) {
    rgbValues = [0, x, chroma];
  } else if (huePrime > 4 && huePrime <= 5) {
    rgbValues = [x, 0, chroma];
  } else {
    rgbValues = [chroma, 0, x];
  }
  const m = l - chroma / 2;
  const r = Math.round((rgbValues[0] + m) * 255);
  const g = Math.round((rgbValues[1] + m) * 255);
  const b = Math.round((rgbValues[2] + m) * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgbToHex = (rgbColor: string) => {
  const rgbValues = rgbColor
    .substring(4, rgbColor.length - 1)
    .split(",")
    .map((value) => Number(value.trim()));
  const hexValues = rgbValues.map((value) => {
    const hexValue = value.toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });
  return `#${hexValues.join("")}`;
};
