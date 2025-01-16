import { createGlobalStyle } from "styled-components";

import "@zendeskgarden/css-bedrock"; //This package provides a mostly reasonable CSS reset layered on top of modern-normalize.

import { theme } from "../theme";
import { getColor } from "../theme/utils";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar-track:hover {
    border-left: solid 1px ${theme.palette.grey["200"]};
    border-right: solid 1px ${theme.palette.grey["200"]};
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    border: solid 2px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 10px 10px ${theme.palette.blue["200"]};
    border: solid 2px transparent;
    border-radius: 25px;
  }

  :root {
    --zd-palette-primary: ${getColor(theme.colors.primaryHue, 600)};
    --zd-palette-danger: ${getColor(theme.colors.dangerHue, 600)};
    --zd-palette-warning: ${getColor(theme.colors.warningHue, 600)};
    --zd-palette-success: ${getColor(theme.colors.successHue, 600)};
    --zd-palette-neutral: ${getColor(theme.colors.neutralHue, 600)};
    --zd-palette-info: ${getColor(theme.colors.infoHue, 600)};
    --zd-palette-chrome: ${getColor(theme.colors.chromeHue, 600)};
    --zd-palette-accent: ${getColor(theme.colors.accentHue, 600)};
  }

  /* This stuff is for Firefox */
  * {
    scrollbar-color: ${theme.palette.blue["200"]} #FFFFFF;
    scrollbar-width: thin;
  }

  html {
    overflow-y: auto;
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
