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
  borderRadii: {
    ...DEFAULT_THEME.borderRadii,
    lg: "8px",
  },
  components: {
    ...DEFAULT_THEME.components,
    Headers: {
      ...DEFAULT_THEME.components.Headers,
      height: "64px",
    },
  },
};

export { theme };
