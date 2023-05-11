import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

export const colors = {
  ...DEFAULT_THEME.colors, // we are overwriting this but want to keep the original colors as reference
  base: "light",
  background: "#fff",
  foreground: "#2f3941",
  primaryHue: "blue",
  dangerHue: "red",
  warningHue: "yellow",
  successHue: "green",
  neutralHue: "grey",
  infoHue: "azure",
  chromeHue: "blue",
  accentHue: "kale",
};
