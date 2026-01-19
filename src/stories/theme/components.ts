import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { cardCmponentStyle } from "../cards/index";
import { AlertArgs } from "../notifications/alerts";
import { colors } from "./colors";
import { fontWeights } from "./fontWeights";
import { palette } from "./palette";
import { getColor } from "./utils";

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
  "notifications.global-alert": ({ alertType }: { alertType: string }) => {
    if (alertType === "primary") {
      return {
        backgroundColor: getColor(colors.primaryHue, 100),
        color: getColor(colors.primaryHue, 700),
        boxShadow: `0 1px 1px ${getColor(colors.primaryHue, 300)}`,
        '[data-garden-id="notifications.global-alert.content"]': {
          color: getColor(colors.primaryHue, 700),
        },
        '[data-garden-id="notifications.global-alert.title"]': {
          color: getColor(colors.accentHue, 800),
        },
        '[data-garden-id="buttons.anchor"]': {},
        ".global-alert-icon": {
          color: getColor(colors.accentHue, 700),
        },
      };
    }
    if (alertType === "accent") {
      return {
        backgroundColor: palette.blue[100],
        color: getColor(colors.primaryHue, 700),
        boxShadow: `0 1px 1px ${getColor(colors.accentHue, 600)}`,
        '[data-garden-id="notifications.global-alert.content"]': {
          color: getColor(colors.accentHue, 700),
        },
        '[data-garden-id="notifications.global-alert.title"]': {
          color: getColor(colors.accentHue, 800),
        },
        '[data-garden-id="buttons.anchor"]': {
          color: getColor(colors.accentHue, 700),
        },
      };
    }
    if (alertType === "info") {
      return {
        backgroundColor: getColor(colors.infoHue, 100),
        color: getColor(colors.primaryHue, 700),
        '[data-garden-id="notifications.global-alert.content"]': {
          color: getColor(colors.infoHue, 700),
        },
        '[data-garden-id="notifications.global-alert.title"]': {
          color: getColor(colors.infoHue, 800),
        },
        '[data-garden-id="buttons.anchor"]': {
          color: getColor(colors.infoHue, 700),
        },
        '[data-garden-id="notifications.global-alert.icon"]': {
          color: getColor(colors.infoHue, 700),
        },
      };
    }
    if (alertType === "error") {
      return {
        ".global-alert-cta": {
          backgroundColor: getColor(colors.dangerHue, 800),
        },
      };
    }
    if (alertType === "warning") {
      return {
        backgroundColor: getColor(colors.warningHue, 300),
        boxShadow: `0 1px 1px ${getColor(colors.warningHue, 600)}`,
        ".global-alert-cta": {
          backgroundColor: getColor(colors.warningHue, 800),
        },
      };
    }
    if (alertType === "success") {
      return {
        backgroundColor: getColor(colors.successHue, 700),
        boxShadow: `0 1px 1px ${getColor(colors.successHue, 700)}`,
        color: getColor(colors.successHue, 50),
        ".global-alert-cta": {
          backgroundColor: getColor(colors.successHue, 800),
        },
      };
    }
  },
  "notifications.global-alert.icon": {
    marginTop: "-2px",
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
  "dropdowns.menu.item": ({ $type, ...props }: any) => {
    if ($type === "danger") {
      return {
        color: getColor(colors.dangerHue, 700),
        "&:hover": {
          boxShadow: `inset 3px 0 ${getColor(colors.dangerHue, 700)}`,
          backgroundColor: getColor(colors.dangerHue, 100),
        },
        "&:active": {
          backgroundColor: getColor(colors.dangerHue, 200),
        },
      };
    }
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
    $isPrimary,
    isBasic,
  }: any) => {
    return {
      ...(isAccent &&
        !$isPrimary &&
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
        $isPrimary &&
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
  "buttons.anchor": () => {
    return {
      textDecoration: "none",
    };
  },
  "buttons.button": ({
    $isPrimary,
    isAccent,
    disabled,
    $isBasic,
    $isLink,
    ...props
  }: any) => {
    return {
      textDecoration: "none",
      ...(isAccent && {
        backgroundColor: "#fff",
        color: getColor(colors.accentHue, 600),
        borderColor: getColor(colors.accentHue, 600),
        "&:hover": {
          color: getColor(colors.accentHue, 800),
          borderColor: getColor(colors.accentHue, 800),
        },
        ...($isPrimary && {
          backgroundColor: getColor(colors.accentHue, 600),
          color: "#fff",
          "&:hover": {
            backgroundColor: getColor(colors.accentHue, 700),
            borderColor: getColor(colors.accentHue, 700),
          },
        }),
        ...($isBasic && {
          backgroundColor: "transparent",
          borderColor: "none",
          "&:hover": {
            borderColor: "none",
          },
        }),
      }),
      ...(disabled && {
        borderColor: "none",
        backgroundColor: palette.grey[200] + "!important",
        "&:hover": {
          borderColor: "none",
        },
      }),
    };
  },
};
