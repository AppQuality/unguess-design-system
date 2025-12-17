import { getColor as zendeskGetColor } from "@zendeskgarden/react-theming";
import { css, DefaultTheme } from "styled-components";
import UAParser from "ua-parser-js";
import { theme as unguessTheme } from ".";

declare type Hue = Record<number | string, string> | string;
declare type GetColorFunction = (
  hue: Hue,
  shade?: number,
  theme?: DefaultTheme,
  transparency?: number
) => string | undefined;

export const getColor: GetColorFunction = (
  hue,
  shade,
  theme = unguessTheme,
  transparency
) => {
  return zendeskGetColor({
    theme,
    hue: hue as string,
    shade,
    transparency,
  });
};

export const hex2rgba = (hex: string, alpha = 1) => {
  const rgb = hex.match(/\w\w/g);
  const [r, g, b] = rgb ? rgb.map((x) => parseInt(x, 16)) : [0, 0, 0];
  return `rgba(${r},${g},${b},${alpha})`;
};

export const boxShadow = (theme: DefaultTheme) => {
  const { space, shadows, palette } = theme;
  const offsetY = `${space.base}px`;
  const blurRadius = `${space.base * 2}px`;
  const shadowColor = getColor(palette.grey, 800, unguessTheme, 0.15);

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
`;
export const sidebarNavItemHidden = css`
  visibility: hidden;
  pointer-events: none;
  color: transparent;
`;
