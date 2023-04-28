import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

/*
 * Design principles https://garden.zendesk.com/design/color (accessed 28 apr 2023)
 * Full DEFAULT_THEME.palette copied here to force the type, reference https://garden.zendesk.com/components/palette (accessed 28 apr 2023)
 */

export const palette = {
  ...DEFAULT_THEME.palette, // we are overwriting this but want to keep the original palette component as reference
  "black": "#000",
  "white": "#fff",
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
  "kale": { // previously water
    "100": "#D4FFF7",
    "200": "#ABEBDF",
    "300": "#6FD1BE",
    "400": "#6FD1BE", // we don't have 400
    "500": "#2B8473", // we don't have 500
    "600": "#2B8473",
    "700": "#206E6A",
    "800": "#0C4D5E",
  },
  "fuschia": {
    "400": "#d653c2",
    "600": "#a81897",
    "M400": "#cf62a8",
    "M600": "#a8458c"
  },
  "pink": {
    "400": "#ec4d63",
    "600": "#d42054",
    "800": "#8A0C49",
    "M400": "#d57287",
    "M600": "#b23a5d"
  },
  "crimson": {
    "400": "#e34f32",
    "600": "#c72a1c",
    "500": "#E34F32",
    "M400": "#cc6c5b",
    "M600": "#b24a3c"
  },
  "orange": {
    "400": "#de701d",
    "600": "#bf5000",
    "M400": "#d4772c",
    "M600": "#b35827"
  },
  "lemon": {
    "400": "#ffd424",
    "600": "#ffbb10",
    "M400": "#e7a500",
    "M500": "#D6AD13",
    "M600": "#c38f00"
  },
  "lime": {
    "400": "#43b324",
    "600": "#2e8200",
    "M400": "#519e2d",
    "M600": "#47782c"
  },
  "mint": {
    "400": "#00a656",
    "600": "#058541",
    "M400": "#299c66",
    "M600": "#2e8057"
  },
  "teal": { // previously darkPine
    "100": "#E6F4F1",
    "200": "#CFFFFD",
    "300": "#B0FFFB",
    "400": "#92FFFA",
    "500": "#73FFF8",
    "600": "#53FAF2",
    "700": "#2FD2CA",
    "800": "#14A9A2",
    "900": "#02807A",
    "M400": "#2d9e8f",
    "M600": "#3c7873"
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
  "royal": {
    "400": "#5d7df5",
    "600": "#3353e2",
    "900": "#1F0F69",
    "M400": "#7986d8",
    "M600": "#4b61c3"
  },
  "purple": {
    "400": "#b552e2",
    "600": "#6a27b8",
    "M400": "#b072cc",
    "M600": "#9358b0"
  }
};