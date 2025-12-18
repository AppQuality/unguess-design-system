import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

/*
 * Design principles https://garden.zendesk.com/design/color (accessed 28 apr 2023)
 * Full DEFAULT_THEME.palette copied here to force the type, reference https://garden.zendesk.com/components/palette (accessed 28 apr 2023)
 */

export const palette = {
  ...DEFAULT_THEME.palette, // we are overwriting this but want to keep the original palette component as reference
  black: "#000000",
  white: "#FFFFFF",
  grey: {
    "100": "#f8f9f9",
    "200": "#e9ebed",
    "300": "#d8dcde",
    "400": "#c2c8cc",
    "500": "#87929d",
    "600": "#68737d",
    "700": "#49545c",
    "800": "#2f3941",
  },
  blue: {
    "50": "#F0F3F5",
    "100": "#E6EBEE",
    "200": "#B0C2CB",
    "300": "#8AA4B2",
    "400": "#547B8E",
    "500": "#336179",
    "600": "#003A57",
    "700": "#00293E",
    "800": "#001825",
  },
  red: {
    // previously mattone
    "100": "#FBEAEB",
    "200": "#F2C1C3",
    "300": "#E9979B",
    "400": "#E06D73",
    "500": "#D7444B",
    "600": "#D22F37",
    "700": "#BD2A32",
    "800": "#A8262C",
    "900": "#932127",
  },
  yellow: {
    // previously gubbio
    "100": "#FFF7EE",
    "200": "#FFE7C9",
    "300": "#FFD7A4",
    "400": "#FFD7A4",
    "500": "#FFB65A",
    "600": "#C57F12",
    "700": "#955F1B",
    "800": "#845418",
    "900": "#734A15",
  },
  green: {
    "10": "#EBF5F2",
    "50": "#B3E8D9",
    "100": "#80D9C0",
    "200": "#66D1B3",
    "300": "#4DC9A6",
    "400": "#00B280",
    "500": "#00A073",
    "600": "#007D5A",
    "700": "#006B4D",
    "800": "#005940",
  },
  azure: {
    // previously royal blue
    "100": "#E3F2F9",
    "200": "#BBDDF2",
    "300": "#92C9EB",
    "400": "#6AB4E2",
    "500": "#4CA4DE",
    "600": "#1466A9",
    "700": "#125C98",
    "800": "#105287",
    "900": "#0E4776",
  },
  kale: {
    // previously water
    "100": "#D4FFF7",
    "200": "#ABEBDF",
    "300": "#6FD1BE",
    "600": "#2B8473",
    "700": "#206E6A",
    "800": "#0C4D5E",
  },
  pink: {
    "600": "#d81e57",
    "700": "#c31a53",
    "800": "#ae1550",
    "900": "#8A0C49",
  },
  crimson: {
    "200": "#e69b96",
    "300": "#d9776f",
    "400": "#e05b4b",
    "500": "#e34f32",
  },
  fuschia: {
    "400": "#d653c2",
    "600": "#a81897",
    M400: "#cf62a8",
    M600: "#a8458c",
  },
  lemon: {
    "400": "#ddda49",
    "500": "#F4D977",
    "600": "#d7c21f",
    "700": "#D6AD13",
  },
  teal: {
    // previously darkPine
    "400": "#28adaa",
    "500": "#029e99",
    "600": "#02908b",
    "700": "#02807a",
  },
  royal: {
    "600": "#3c3695",
    "700": "#342c8a",
    "800": "#2d227e",
    "900": "#1F0F69",
  },
  purple: {
    "200": "#b5a5fe",
    "300": "#957fff",
    "400": "#7761fe",
    "500": "#5847f6",
  },
  lime: {
    "400": "#43b324",
    "600": "#2e8200",
    M400: "#519e2d",
    M600: "#47782c",
  },
  mint: {
    "400": "#00a656",
    "500": "#00a656",
    "600": "#058541",
    M400: "#299c66",
    M600: "#2e8057",
  },
  orange: {
    "400": "#de701d",
    "600": "#bf5000",
    M400: "#d4772c",
    M600: "#b35827",
  },
  talk: {
    "0": "#FFFDF9",
    "50": "#FDF8E6",
    "100": "#FCF3D3",
    "200": "#FAEDC1",
    "300": "#F9E8AE",
    "400": "#F5DE88",
    "500": "#F2D363",
    "600": "#EFC93D",
    "700": "#D1AF32",
    "800": "#B39527",
    "900": "#957B1D",
  },
};
