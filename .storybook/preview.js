import { ThemeProvider } from "@zendeskgarden/react-theming";
import theme from '../src/stories/theme';


export const decorators = [
  (Story) => (
    <ThemeProvider>
      {console.log(theme)}
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
}