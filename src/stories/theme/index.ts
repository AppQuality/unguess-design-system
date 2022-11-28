import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";
import { gradients } from "./gradients";
import { components } from "./components";
import { boxShadow } from "./utils";
import { fontWeights } from "./fontWeights";

const theme = {
  ...DEFAULT_THEME,
  breakpoints: {
    ...DEFAULT_THEME.breakpoints,
    xxl: "1440px",
  },
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: palette.blue[600],
    warningHue: palette.yellow[600],
    successHue: palette.teal["M600"],
    dangerHue: palette.red[600],
    accentHue: palette.water[600],
  },
  palette: palette,
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins",sans-serif,Helvetica,Arial,sans-serif',
  },
  fontWeights: fontWeights,
  gradients: gradients,
  borderRadii: {
    //{sm: '2px', md: '4px', lg: '8px', xl: '16px', xxl: '32px'}
    ...DEFAULT_THEME.borderRadii,
    lg: "8px",
    xl: "16px",
    xxl: "32px",
  },
  lineHeights: {
    ...DEFAULT_THEME.lineHeights,
    xs: "16px", // same as sm
  },
  components: components,
  shadows: {
    ...DEFAULT_THEME.shadows,
    boxShadow: boxShadow,
  },
};

export { theme };
