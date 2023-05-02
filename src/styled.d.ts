import "styled-components";
import { theme } from "./stories/theme";

declare module "styled-components" {
  type UgTheme = typeof theme;
  export interface DefaultTheme extends UgTheme {}
}
