import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { fontWeights } from "./fontWeights";
import { colors } from "./colors";
import { palette } from "./palette";
import {cardCmponentStyle} from "../cards/index";

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
    };
  },
  "buttons.icon_button": ({
    disabled,
  }: {
    disabled: boolean;
  }) => {
    return {
      ...(disabled && { pointerEvents: "none" }),
    };
  },
};
