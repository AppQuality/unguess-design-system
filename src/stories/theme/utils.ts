export const hex2rgba = (hex: string, alpha = 1) => {
  const rgb = hex.match(/\w\w/g);
  const [r, g, b] = rgb ? rgb.map((x) => parseInt(x, 16)) : [0, 0, 0];
  return `rgba(${r},${g},${b},${alpha})`;
};
