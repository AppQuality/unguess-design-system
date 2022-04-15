import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";
import { gradients } from "./gradients";
import { boxShadow } from "./utils";

const theme = {
  ...DEFAULT_THEME,
  palette: palette,
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins",sans-serif,Helvetica,Arial,sans-serif',
  },
  gradients: gradients,
  borderRadii: {
    ...DEFAULT_THEME.borderRadii,
    lg: "8px",
    xl: "16px",
    xxl: "32px",
  },
  components: {
    ...DEFAULT_THEME.components,
    Headers: {
      ...DEFAULT_THEME.components.Headers,
      height: "64px",
    },
  },
  shadows: {
    ...DEFAULT_THEME.shadows,
    boxShadow: boxShadow,
  }
};

export { theme };
