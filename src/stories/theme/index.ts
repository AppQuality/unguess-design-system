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
    boxShadow: () => `rgba(0, 58, 87, 0.15) 0px 20px 30px 0px`,
    headerShadow: () => `rgba(0, 58, 87, 0.15) 0px 0px 10px 0px`,
    lg: () => `rgba(0, 58, 87, 0.15) 0px 20px 30px 0px`,
    card: () => ` ${palette.grey[800]}26 0px 4px 8px 0px`,
  },
  levels: {
    back: -1,
    base: 0,
    front: 100,
    modal: 200,
  },
};
export { ThemeProvider, getColor, retrieveComponentStyles, theme };
