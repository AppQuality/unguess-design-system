import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { fontWeights } from "./fontWeights";
import { colors } from "./colors";
import { palette } from "./palette";

export const components = {
  ...DEFAULT_THEME.components,
  chrome: {
    ...DEFAULT_THEME.components?.chrome,
    header: {
      ...DEFAULT_THEME.components?.chrome?.header,
      height: "64px",
    },
    nav: {
      ...DEFAULT_THEME.components?.chrome?.nav,
      openWidth: 240,
      closedWidth: 36,
      workspaceDropdownWidth: 192,
    },
  },

  notification: {
    ...DEFAULT_THEME.components?.notification,
    card: {
      ...DEFAULT_THEME.components?.notification?.well,
      padding: "16px",
    },
  },

  pageHeader: {
    imgMaxHeight: "214px",
  },

  autocomplete: {
    thumbSize: "60px",
  },

  "tabs.tab": ({ isSelected }: { isSelected: boolean }) => {
    return isSelected ? { fontWeight: fontWeights.semibold } : undefined;
  },
  "forms.input": ({ isFocused }: { isFocused: boolean }) => {
    return isFocused
      ? {
          boxShadow: `0 0 0 3px ${palette.kale[200]}}`,
        }
      : undefined;
  },
  "dropdowns.item": ({
    addable,
    checked,
    ...rest
  }: {
    addable: boolean;
    checked: boolean;
  }) => {
    return {
      ...(addable
        ? {
            color: colors.primaryHue,
            cursor: "pointer",
          }
        : {}),

      ...(checked
        ? {
            fontWeight: fontWeights.semibold,
          }
        : {}),
      "&:hover": {
        backgroundColor: palette.kale[100],
      },
    };
  },
};
