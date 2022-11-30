import { ThemeProvider } from "@zendeskgarden/react-theming";
import { GlobalStyle } from "../src/stories/shared/globalStyle";
import { theme } from "../src/stories/theme";

export const decorators = [
  (story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {story()}
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
