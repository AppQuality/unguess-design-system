import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";
import { gradients } from "./gradients";

const theme = {
  ...DEFAULT_THEME,
  palette: palette,
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins",sans-serif,Helvetica,Arial,sans-serif',
  },
  gradients: gradients,

};

export { theme };
