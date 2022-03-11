import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";

const theme = {
  ...DEFAULT_THEME,
  palette: palette,
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins",sans-serif,Helvetica,Arial,sans-serif',
  },
};

export { theme };
