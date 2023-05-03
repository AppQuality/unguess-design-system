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
        backgroundColor: palette.blue[50],
      },
    };
  },
  "buttons.icon_button": ({
    isDanger,
    isBasic,
    isPrimary,
    isHovered,
    isNeutral,
    isBright,
    disabled,
  }: {
    isBasic: boolean;
    isDanger: boolean;
    isPrimary: boolean;
    isHovered: boolean;
    isNeutral: boolean;
    isBright: boolean;
    disabled: boolean;
  }) => {
    if (isNeutral || isPrimary || isDanger) return {};

    return {
      ...(isBasic && {
        backgroundColor: palette.white,
        "&:hover": {
          backgroundColor: palette.blue[50],
        },
      }),
      ...(isBright && {
        backgroundColor: "transparent",
        color: "white",
        "&:hover": {
          backgroundColor: palette.grey[500],
          color: palette.blue[50],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
          color: palette.blue[50],
        },
      }),
      ...(disabled && { pointerEvents: "none" }),
    };
  },
  "buttons.button": ({
    isDanger,
    isPrimary,
    isHovered,
    isNeutral,
    isBright,
  }: {
    isDanger: boolean;
    isPrimary: boolean;
    isHovered: boolean;
    isNeutral: boolean;
    isBright: boolean;
  }) => {
    if (isBright) {
      return {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        "&:hover": {
          backgroundColor: palette.grey[500],
          color: palette.blue[50],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
          color: palette.blue[50],
        },
      };
    }

    return {};
  },
};
