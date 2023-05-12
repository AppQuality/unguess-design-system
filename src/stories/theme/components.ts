import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { fontWeights } from "./fontWeights";
import { colors } from "./colors";
import { palette } from "./palette";
import { getColor } from "./utils";
import {cardCmponentStyle} from "../cards/index";
import { ButtonArgs } from "../buttons/button/_types";

export const components: Record<string, any> = {
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
  ...cardCmponentStyle,

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
          backgroundColor: getColor(colors.successHue, 700),
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "warning" &&
        isPrimary && {
          backgroundColor: getColor(colors.warningHue, 700),
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "error" &&
        isPrimary && {
          backgroundColor: getColor(colors.dangerHue, 700),
          svg: {
            ...svgCss,
            color: palette.white,
          },
        }),
      ...(type === "info" &&
        isPrimary && {
          backgroundColor: getColor(colors.infoHue, 700),
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
    };
  },
  "buttons.icon_button": ({
    disabled,
    isBright,
    isAccent,
    isPrimary,
    isBasic,
  }: ButtonArgs) => {
    return {
      ...(isAccent && !isPrimary && !isBasic && {
        borderColor: getColor(colors.accentHue, 700),
        color: getColor(colors.accentHue, 700),
        "&:hover": {
          borderColor: getColor(colors.accentHue, 800),
          color: getColor(colors.accentHue, 800),
          backgroundColor: palette.blue[50],
        },
        "&:active": {
          borderColor: getColor(colors.accentHue, 800),
          color: getColor(colors.accentHue, 800),
          backgroundColor: palette.blue[100],
        },
      }),
      ...(isAccent && isBasic && {
        color: getColor(colors.accentHue, 700),
        "&:hover": {
          backgroundColor: palette.blue[50],
          color: getColor(colors.accentHue, 800),
        },
        "&:active": {
          backgroundColor: palette.blue[100],
          color: getColor(colors.accentHue, 800),
        },
      }),
      ...(isAccent && isPrimary && {
        backgroundColor: getColor(colors.accentHue, 600),
        color: "white",
        "&:hover": {
          backgroundColor: getColor(colors.accentHue, 700),
          color: "white",
        },
        "&:active": {
          backgroundColor: getColor(colors.accentHue, 800),
          color: "white",
        },
      }),
      ...(isBright && {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        "&:hover": {
          backgroundColor: palette.grey[500],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
        },
      }),
      ...(disabled && { pointerEvents: "none" }),
    };
  },
  "buttons.button": ({
    isAccent,
    isBright,
    isPrimary,
    isBasic,
    isLink,
  }: ButtonArgs) => {
    return {
      ...(isAccent && !isPrimary && !isBasic && !isLink && {
        borderColor: getColor(colors.accentHue, 700),
        color: getColor(colors.accentHue, 700),
        "&:hover": {
          borderColor: getColor(colors.accentHue, 800),
          color: getColor(colors.accentHue, 800),
          backgroundColor: palette.blue[50],
        },
        "&:active": {
          borderColor: getColor(colors.accentHue, 800),
          color: getColor(colors.accentHue, 800),
          backgroundColor: palette.blue[100],
        },
      }),
      ...(isAccent && isPrimary && {
        backgroundColor: getColor(colors.accentHue, 600),
        "&:hover": {
          backgroundColor: getColor(colors.accentHue, 700),
        },
        "&:active": {
          backgroundColor: getColor(colors.accentHue, 800),
        },
      }),
      ...(isAccent && isBasic && {
        color: getColor(colors.accentHue, 700),
        "&:hover": {
          backgroundColor: palette.blue[50],
          color: getColor(colors.accentHue, 800),
        },
        "&:active": {
          backgroundColor: palette.blue[100],
          color: getColor(colors.accentHue, 800),
        },
      }),
      ...(isAccent && isLink && {
        color: getColor(colors.accentHue, 700),
        "&:hover": {
          color: getColor(colors.accentHue, 800),
        },
        "&:active": {
          color: getColor(colors.accentHue, 800),
        },
      }),
        ...(isBright && {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        "&:hover": {
          backgroundColor: palette.grey[500],
        },
        "&:active": {
          backgroundColor: palette.grey[600],
        },
      }),
    };
  },
};
