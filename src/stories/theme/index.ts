import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";
import { gradients } from "./gradients";
import { components } from "./components";
import { boxShadow } from "./utils";

const theme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: palette.blue[600],
  },
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
  components: components,
  shadows: {
    ...DEFAULT_THEME.shadows,
    boxShadow: boxShadow,
  },
};

export { theme };
