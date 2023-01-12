import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { palette } from "./palette";
import { gradients } from "./gradients";
import { components } from "./components";
import { boxShadow } from "./utils";
import { fontWeights } from "./fontWeights";
import { colors } from "./colors";

const theme = {
  ...DEFAULT_THEME,
  breakpoints: {
    ...DEFAULT_THEME.breakpoints,
    xxl: "1440px",
  },
  colors,
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
  levels: {
    back: -1,
    base: 0,
    front: 100,
    modal: 200,
  },
};

export { theme };
