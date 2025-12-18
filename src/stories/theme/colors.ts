import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
type ThemeColors = typeof DEFAULT_THEME.colors & {
  infoHue: string;
  accentHue: string;
};

export const colors: ThemeColors = {
  ...DEFAULT_THEME.colors, // we are overwriting this but want to keep the original colors as reference
  base: "light",
  variables: {
    ...DEFAULT_THEME.colors.variables,
    light: {
      ...DEFAULT_THEME.colors.variables.light,
      border: {
        default: "neutralHue.200",
        emphasis: "neutralHue.600",
        subtle: "neutralHue.200",
        success: "successHue.300",
        warning: "warningHue.300",
        danger: "dangerHue.300",
        primaryEmphasis: "primaryHue.600",
        successEmphasis: "successHue.600",
        warningEmphasis: "warningHue.600",
        dangerEmphasis: "dangerHue.600",
        disabled: "neutralHue.300",
      },
      foreground: {
        default: "grey.800",
        subtle: "neutralHue.600",
        onEmphasis: "palette.white",
        primary: "primaryHue.600",
        success: "successHue.600",
        warning: "warningHue.600",
        danger: "dangerHue.600",
        successEmphasis: "successHue.900",
        warningEmphasis: "warningHue.900",
        dangerEmphasis: "dangerHue.900",
        disabled: "neutralHue.600",
      },
    },
  },
  primaryHue: "blue",
  dangerHue: "red",
  warningHue: "yellow",
  successHue: "green",
  neutralHue: "grey",
  infoHue: "azure",
  chromeHue: "blue",
  accentHue: "kale",
};
