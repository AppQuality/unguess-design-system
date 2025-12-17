import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
type ThemeColors = typeof DEFAULT_THEME.colors & {
  infoHue: string;
  accentHue: string;
};

export const colors: ThemeColors = {
  ...DEFAULT_THEME.colors, // we are overwriting this but want to keep the original colors as reference
  base: "light",
  primaryHue: "blue",
  dangerHue: "red",
  warningHue: "yellow",
  successHue: "green",
  neutralHue: "grey",
  infoHue: "azure",
  chromeHue: "blue",
  accentHue: "kale",
};
