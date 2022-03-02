import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

const theme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: "pink",
    foreground: "red",
  },
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: '"Poppins",sans-serif,Helvetica,Arial,sans-serif',
  },
};

export default theme;
