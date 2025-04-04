import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ButtonArgs } from "../buttons/button/_types";
import { cardCmponentStyle } from "../cards/index";
import { colors } from "./colors";
import { fontWeights } from "./fontWeights";
import { palette } from "./palette";
import { getColor } from "./utils";
import { AlertArgs } from "../notifications/alerts";

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
  ...cardCmponentStyle,
  "cursor_pagination.cursor": ({ disabled }: { disabled: boolean }) => {
    return {
      ...(disabled && {
        color: palette.grey[400],
        "&:hover, &:active": {
          color: palette.grey[400],
          backgroundColor: "transparent",
          cursor: "auto",
        },
      }),
    };
  },
  "notifications.alert": ({ type }: AlertArgs) => {
    return {
      ...(type === "success" && {
        backgroundColor: getColor(colors.successHue, 10),
      }),
    };
  },
  "text.primary": () => ({
    color: getColor(colors.primaryHue, 600),
  }),
  "text.success": () => ({
    color: getColor(colors.successHue, 700),
  }),
  "text.warning": () => ({
    color: getColor(colors.warningHue, 700),
  }),
  "text.danger": () => ({
    color: getColor(colors.dangerHue, 700),
  }),
  "navigation.hoverableItem": ({ isCurrent }: { isCurrent: boolean }) => {
    // used for chrome nav and sidebar scroll nav in unguess-react
    return {
      "border-top-left-radius": "24px",
      "border-bottom-left-radius": "24px",
      color: getColor(colors.primaryHue, 600),
      "font-weight": fontWeights.medium,
      "&:hover, &.hover": {
        "background-color": getColor(colors.primaryHue, 600, undefined, 0.08), // zendesk garden default hover color
        color: getColor(colors.primaryHue, 700),
      },
      "&:active, &.active": {
        "background-color": getColor(colors.primaryHue, 600, undefined, 0.2), // zendesk garden default active color
        color: getColor(colors.primaryHue, 700),
      },
      "&.isCurrent": {
        // class approach
        color: getColor(colors.primaryHue, 700),
        "font-weight": fontWeights.semibold,
        "background-color": getColor(colors.primaryHue, 600, undefined, 0.08),
      },
      ...(isCurrent && {
        // props approach
        color: getColor(colors.primaryHue, 700),
        "font-weight": fontWeights.semibold,
        "background-color": getColor(colors.primaryHue, 600, undefined, 0.08),
      }),
    };
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
      ...(!isPrimary && {
        svg: svgCss,
      }),
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
            color: getColor(colors.primaryHue, 600),
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
      ...(isAccent &&
        !isPrimary &&
        !disabled &&
        !isBasic && {
          borderColor: getColor(colors.accentHue, 700),
          color: getColor(colors.accentHue, 700),
          "&:hover": {
            borderColor: getColor(colors.accentHue, 800),
            color: getColor(colors.accentHue, 800),
            backgroundColor: getColor(colors.primaryHue, 600, undefined, 0.08),
          },
          "&:active": {
            borderColor: getColor(colors.accentHue, 800),
            color: getColor(colors.accentHue, 800),
            backgroundColor: palette.blue[100],
          },
        }),
      ...(isAccent &&
        isBasic &&
        !disabled && {
          color: getColor(colors.accentHue, 700),
          "&:hover": {
            backgroundColor: getColor(colors.primaryHue, 600, undefined, 0.08),
            color: getColor(colors.accentHue, 800),
          },
          "&:active": {
            backgroundColor: palette.blue[100],
            color: getColor(colors.accentHue, 800),
          },
        }),
      ...(isAccent &&
        isPrimary &&
        !disabled && {
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
      ...(isBright &&
        !disabled && {
          backgroundColor: "transparent",
          color: "white",
          border: "none",
          "&:hover": {
            backgroundColor: palette.grey[500],
            color: "white",
            "& svg": {
              color: "white",
            },
          },
          "&:active": {
            backgroundColor: palette.grey[600],
            color: "white",
            "& svg": {
              color: "white",
            },
          },
        }),
      ...(disabled && { pointerEvents: "none" }),
    };
  },
  "dropdowns.combobox": (props: any) => {
    return {
      "[data-garden-id='dropdowns.combobox.floating']": {
        ...(props.fullWidthOption ? {} : { width: "auto !important" }),
      },
    };
  },
  "buttons.button": ({
    isAccent,
    isBright,
    isPrimary,
    isBasic,
    isLink,
    disabled,
  }: ButtonArgs) => {
    return {
      ...(isAccent &&
        !isPrimary &&
        !isBasic &&
        !isLink &&
        !disabled && {
          borderColor: getColor(colors.accentHue, 700),
          color: getColor(colors.accentHue, 700),
          "&:hover": {
            borderColor: getColor(colors.accentHue, 800),
            color: getColor(colors.accentHue, 800),
            backgroundColor: getColor(colors.primaryHue, 600, undefined, 0.08),
          },
          "&:active": {
            borderColor: getColor(colors.accentHue, 800),
            color: getColor(colors.accentHue, 800),
            backgroundColor: palette.blue[100],
          },
        }),
      ...(isAccent &&
        isPrimary &&
        !disabled && {
          backgroundColor: getColor(colors.accentHue, 600),
          "&:hover": {
            backgroundColor: getColor(colors.accentHue, 700),
          },
          "&:active": {
            backgroundColor: getColor(colors.accentHue, 800),
          },
        }),
      ...(isAccent &&
        isBasic &&
        !disabled && {
          color: getColor(colors.accentHue, 700),
          "&:hover": {
            backgroundColor: getColor(colors.primaryHue, 600, undefined, 0.08),
            color: getColor(colors.accentHue, 800),
          },
          "&:active": {
            backgroundColor: palette.blue[100],
            color: getColor(colors.accentHue, 800),
          },
        }),
      ...(isAccent &&
        isLink &&
        !disabled && {
          color: getColor(colors.accentHue, 700),
          "&:hover": {
            color: getColor(colors.accentHue, 800),
          },
          "&:active": {
            color: getColor(colors.accentHue, 800),
          },
        }),
      ...(isBright &&
        !disabled && {
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
