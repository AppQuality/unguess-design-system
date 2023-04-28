import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";

export const colors = {
  ...DEFAULT_THEME.colors,
  primaryHue: palette.blue[600],
  warningHue: palette.yellow[700],
  successHue: palette.green[700],
  dangerHue: palette.red[600],
  accentHue: palette.kale[600],
};
