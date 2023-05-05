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

  "notifications.notification": ({
    type,
    isPrimary,
  }: {
    type: string;
    isPrimary: boolean;
  }) => {
    const svgCss = {
      marginTop: "-1px",
    };

    return {
      ...(type === "success" &&
        isPrimary && {
          backgroundColor: palette.green[700],
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "warning" &&
        isPrimary && {
          backgroundColor: palette.yellow[700],
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "error" &&
        isPrimary && {
          backgroundColor: palette.red[700],
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "info" &&
        isPrimary && {
          backgroundColor: palette.blue[700],
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...!isPrimary && {
        svg: svgCss,
      },
    };
  },
  "notifications.notification.close": ({
    type,
    isPrimary,
  }: {
    type: string;
    isPrimary: boolean;
  }) => {
    return {
      cursor: "pointer",
      ...(type === "success" &&
        isPrimary && {
          color: palette.white,
          ":hover": {
            color: palette.white,
          },
        }),
      ...(type === "warning" &&
        isPrimary && {
          color: palette.white,
          ":hover": {
            color: palette.white,
          },
        }),
      ...(type === "error" &&
        isPrimary && {
          color: palette.white,
          ":hover": {
            color: palette.white,
          },
        }),
      ...(type === "info" &&
        isPrimary && {
          color: palette.white,
          ":hover": {
            color: palette.white,
          },
        }),
    };
  },
  "notifications.notification.close-icon": () => {
    return {
      position: "relative",
      top: "unset",
      right: "unset",
      width: "auto",
      height: "auto",
    };
  },
  "notifications.notification.title": ({
    type,
    isPrimary,
  }: {
    type: string;
    isPrimary: boolean;
  }) => {
    return {
      ...(type === "success" &&
        isPrimary && {
          color: palette.white + " !important",
        }),
      ...(type === "warning" &&
        isPrimary && {
          color: palette.white + " !important",
        }),
      ...(type === "error" &&
        isPrimary && {
          color: palette.white + " !important",
        }),
      ...(type === "info" &&
        isPrimary && {
          color: palette.white + " !important",
        }),
    };
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
        backgroundColor: palette.kale[100],
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
          backgroundColor: palette.kale[200],
        },
      }),
      ...(isBright && {
        backgroundColor: "transparent",
        color: "white",
        "&:hover": {
          backgroundColor: palette.grey[500],
          color: palette.kale[100],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
          color: palette.kale[200],
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
          color: palette.kale[100],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
          color: palette.kale[200],
        },
      };
    }

    return {};
  },
};
