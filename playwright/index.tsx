// Import styles, initialize component theme here.
// import '../src/common.css';
import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import {GlobalStyle} from "../src/stories/shared/globalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/stories/theme";

beforeMount(async ({ App }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  );
});