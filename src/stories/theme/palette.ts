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
  "yellow": { // previously gubbio
    "50": "#FFF0DE",
    "100": "#FFE2BD",
    "200": "#FFDBAD",
    "300": "#FFC57B",
    "400": "#E6A451",
    "500": "#CC9248",
    "600": "#A5691E",
    "700": "#955F1B",
    "800": "#845418",
    "900": "#734A15",
  },
  "green": {
    "50": "#CCF0E6",
    "100": "#B3E8D9",
    "200": "#4DC9A6",
    "300": "#1ABA8D",
    "400": "#00B280",
    "500": "#00A073",
    "600": "#007D5A",
    "700": "#006B4D",
    "800": "#005940"
  },
  "azure": { // previously royal blue
    "100": "#DDEFFE",
    "200": "#BADFFD",
    "300": "#98CFFC",
    "400": "#75BFFB",
    "500": "#64B7FB",
    "600": "#1466A9",
    "700": "#125C98",
    "800": "#105287",
    "900": "#0E4776",
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
