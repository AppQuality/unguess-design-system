import { createGlobalStyle } from "styled-components";
import { theme } from "../theme";

const GlobalStyle = createGlobalStyle`
body {
    font-family: ${theme.fonts.system};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }`;

export default GlobalStyle;
