import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

/*
 * Design principles https://garden.zendesk.com/design/color (accessed 28 apr 2023)
 * Full DEFAULT_THEME.palette copied here to force the type, reference https://garden.zendesk.com/components/palette (accessed 28 apr 2023)
 */

export const palette = {
  ...DEFAULT_THEME.palette, // we are overwriting this but want to keep the original palette component as reference
  "black": "#000000",
  "white": "#FFFFFF",
  "product": {
    "support": "#00a656",
    "message": "#37b8af",
    "explore": "#30aabc",
    "gather": "#f6c8be",
    "guide": "#ff6224",
    "connect": "#ff6224",
    "chat": "#f79a3e",
    "talk": "#efc93d",
    "sell": "#c38f00"
  },
  "grey": {
    "100": "#f8f9f9",
    "200": "#e9ebed",
    "300": "#d8dcde",
    "400": "#c2c8cc",
    "500": "#87929d",
    "600": "#68737d",
    "700": "#49545c",
    "800": "#2f3941"
  },
  "blue": {
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
  "red": { // previously mattone
    "100": "#FFEEEE",
    "200": "#FFCFD1",
    "300": "#FFB0B4",
    "400": "#FF9297",
    "500": "#FF7379",
    "600": "#FA535B",
    "700": "#D22F37",
    "800": "#A9141B",
    "900": "#800208",
  },
  "yellow": { // previously gubbio
    "100": "#FFF7EE",
    "200": "#FFE7C9",
    "300": "#FFD7A4",
    "400": "#FFC67F",
    "500": "#FFB65A",
    "600": "#E9A045",
    "700": "#C78430",
    "800": "#A5691E",
    "900": "#835011",
  },
  "green": {
    "50": "#E2F4EC",
    "100": "#b8e3d0",
    "200": "#88d0b3",
    "300": "#50BF95",
    "400": "#00b280",
    "500": "#00a56a",
    "600": "#00965F",
    "700": "#008452",
    "800": "#007345",
  },
  "azure": { // previously royal blue
    "100": "#EEF7FF",
    "200": "#CFE9FF",
    "300": "#B0DBFF",
    "400": "#92CDFF",
    "500": "#73BFFF",
    "600": "#53AFFA",
    "700": "#2F88D2",
    "800": "#1466A9",
    "900": "#024780",
    "M400": "#5f8dcf",
    "M600": "#3a70b2"
  },
  "kale": { // previously water
    "100": "#D4FFF7",
    "200": "#ABEBDF",
    "300": "#6FD1BE",
    "600": "#2B8473",
    "700": "#206E6A",
    "800": "#0C4D5E",
  },
  "pink": {
    "600": "#d81e57",
    "700": "#c31a53",
    "800": "#ae1550",
    "900": "#8A0C49",
  },
  "crimson": {
    "200": "#e69b96",
    "300": "#d9776f",
    "400": "#e05b4b",
    "500": "#e34f32",
  },
  "lemon": {
    "400": "#ddda49",
    "500": "#d8d427",
    "600": "#d7c21f",
    "700": "#D6AD13",
  },
  "teal": { // previously darkPine
    "400": "#28adaa",
    "500": "#029e99",
    "600": "#02908b",
    "700": "#02807a",
  },
  "royal": {
    "600": "#3c3695",
    "700": "#342c8a",
    "800": "#2d227e",
    "900": "#1F0F69",
  },
  "purple": {
    "200": "#b5a5fe",
    "300": "#957fff",
    "400": "#7761fe",
    "500": "#5847f6",
  }
};
