import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";

export const colors = {
  ...DEFAULT_THEME.colors,
  primaryHue: palette.blue[600],
  warningHue: palette.yellow[600],
  successHue: palette.teal["M600"],
  dangerHue: palette.red[600],
  accentHue: palette.water[600],
};
