import { DEFAULT_THEME } from "@zendeskgarden/react-theming";

export const components = {
  ...DEFAULT_THEME.components,
  chrome: {
    ...DEFAULT_THEME.components?.chrome,
    header: {
      ...DEFAULT_THEME.components?.chrome?.header,
      height: "64px",
    },  
  },

  notification:
  {
    ...DEFAULT_THEME.components?.notification,
    card: {
      ...DEFAULT_THEME.components?.notification?.well,
      padding: "16px",
    },
  }
};
