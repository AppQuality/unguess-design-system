import { getColor, IGardenTheme } from "@zendeskgarden/react-theming";
import { css } from "styled-components";
import UAParser from "ua-parser-js";

export const hex2rgba = (hex: string, alpha = 1) => {
  const rgb = hex.match(/\w\w/g);
  const [r, g, b] = rgb ? rgb.map((x) => parseInt(x, 16)) : [0, 0, 0];
  return `rgba(${r},${g},${b},${alpha})`;
};

export const boxShadow = (theme: IGardenTheme) => {
  const { space, shadows, palette } = theme;
  const offsetY = `${space.base}px`;
  const blurRadius = `${space.base * 2}px`;
  const shadowColor = getColor(palette.grey, 800, theme, 0.15);

  return shadows.lg(offsetY, blurRadius, shadowColor as string);
};

export const isMac = () => {
  const parser = new UAParser();
  const os = parser.getOS().name;

  return os && /Mac OS|iOS/.test(os);
};

export const opacityTransition = css`
  transition: opacity 0.2s ease;
`;

export const sidebarNavItemExpanded = css`
  visibility: visible;
  opacity: 1;
  // transition: opacity 0.2s ease;
`;
export const sidebarNavItemHidden = css`
  visibility: hidden;
  pointer-events: none;
  color: transparent;
`;
