import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";

export const colors = {
  ...DEFAULT_THEME.colors,
  background: palette.white,
  foreground: palette.black,
  primaryHue: palette.blue[600],
  accentHue: palette.kale[600],
  warningHue: palette.yellow[600],
  successHue: palette.green[700],
  dangerHue: palette.red[700],
  infoHue: palette.azure[600],
  neutralHue: palette.grey[600],
  chromeHue: palette.grey[200],
  menuHover: palette.blue[50],
  menuSelected: palette.blue[100],
  border: palette.grey[300],
};
