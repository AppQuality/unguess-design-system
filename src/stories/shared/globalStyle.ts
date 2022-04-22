import { createGlobalStyle } from "styled-components";
import { theme } from "../theme";

const GlobalStyle = createGlobalStyle`

  ::-webkit-scrollbar-track:hover {
    border-left: solid 1px ${theme.palette.grey["200"]};
    border-right: solid 1px ${theme.palette.grey["200"]};
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border: solid 2px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px ${theme.palette.blue["200"]};
    border: solid 2px transparent;
    border-radius: 25px;
  }

  /* This stuff is for Firefox */
  * {
    scrollbar-color: ${theme.palette.blue["200"]} #FFFFFF;
    scrollbar-width: thin;
  }
  
  body {
    font-family: ${theme.fonts.system};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  svg {
    max-height: 100%;
  }

`;

export { GlobalStyle };
