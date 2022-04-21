import { createGlobalStyle } from "styled-components";
import { theme } from "../theme";

const GlobalStyle = createGlobalStyle`

  ::-webkit-scrollbar-track:hover {
    border-left: solid 1px #E9EBED;
    border-right: solid 1px #E9EBED;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border: solid 2px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px #B0C2CB;
    border: solid 2px transparent;
    border-radius: 25px;
  }

  /* This stuff is for Firefox */
  * {
    scrollbar-color: #B0C2CB #FFFFFF;
    scrollbar-width: thin;
  }
  
  body {
    font-family: ${theme.fonts.system};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  svg {
    max-height: 100%;
  }

`;

export { GlobalStyle };
