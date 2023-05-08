import { create } from "@storybook/theming";
import { theme } from "../src/stories/theme";


export default create({
  base: "light",
  brandTitle: "Unguess Design System",
  brandUrl: "https://app.unguess.io",
  brandImage:
    "https://app.unguess.io/wp-content/themes/unguess/assets/img/logo.svg",
  colorPrimary: getColor(theme.colors.primaryHue, 600),
  colorSecondary: theme.palette.blue['500'],

  //   // UI
  //   appBg: 'white',
  //   appContentBg: 'silver',
  //   appBorderColor: 'grey',
  //   appBorderRadius: 4,

  //   // Typography
  //   fontBase: '"Open Sans", sans-serif',
  //   fontCode: 'monospace',

  //   // Text colors
  //   textColor: 'black',
  //   textInverseColor: 'rgba(255,255,255,0.9)',

  //   // Toolbar default and active colors
  //   barTextColor: 'silver',
  //   barSelectedColor: 'black',
  //   barBg: 'hotpink',

  //   // Form colors
  //   inputBg: 'white',
  //   inputBorder: 'silver',
  //   inputTextColor: 'black',
  //   inputBorderRadius: 4,
});
