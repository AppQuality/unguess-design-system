import {
  DEFAULT_THEME,
  ThemeProvider,
  getColor,
  retrieveComponentStyles,
} from "@zendeskgarden/react-theming";
import { colors } from "./colors";
import { components } from "./components";
import { fontWeights } from "./fontWeights";
import { gradients } from "./gradients";
import { palette } from "./palette";
import { boxShadow } from "./utils";

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

export { ThemeProvider, getColor, retrieveComponentStyles, theme };
