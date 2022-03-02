import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

const theme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: "pink",
    foreground: "red",
  },
  fontWeights: {
    thin: 400,
    extralight: 400,
    light: 400,
    regular: 400,
    medium: 500,
    semibold: 700,
    bold: 700,
    extrabold: 700,
    black: 700,
  },
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins", sans-serif, Helvetica',
  },
};

export default theme;
