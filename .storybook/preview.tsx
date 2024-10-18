import { ThemeProvider } from "@zendeskgarden/react-theming";
import React from "react";
import { GlobalStyle } from "../src/stories/shared/globalStyle";
import { theme } from "../src/stories/theme";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },
  options: {
    storySort: {
      order: [
        "Overview",
        "Theme",
        "Atoms",
        "Molecules",
        "Organisms",
        "Templates",
        "Pages",
      ],
    },
  },
};
