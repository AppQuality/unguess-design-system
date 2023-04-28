import { palette } from "./palette";
import { hex2rgba } from "./utils";

export const gradients = {
  horizontal: `linear-gradient(90.81deg, ${hex2rgba(
    palette.blue[600]
  )} 11.98%, ${hex2rgba(palette.green[400])} 100%);`,
  dark: `linear-gradient(90.81deg, ${hex2rgba(
    palette.blue[800]
  )} 0%, ${hex2rgba(palette.blue[600])} 100%);`,
};
