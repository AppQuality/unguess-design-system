import { palette } from "./palette";
import { hex2rgba } from "./utils";

export const gradients = {
  dark: `linear-gradient(90.81deg, ${hex2rgba(
    palette.blue[800]
  )} 0%, ${hex2rgba(palette.blue[600])} 100%)`,
};
