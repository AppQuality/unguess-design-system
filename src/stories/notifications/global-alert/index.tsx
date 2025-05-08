import {
  GlobalAlert as ZendeskGlobalAlert,
  IGlobalAlertProps,
} from "@zendeskgarden/react-notifications";
import { ReactComponent as PrimaryIcon } from "@zendeskgarden/svg-icons/src/16/gear-stroke.svg";
import { ReactComponent as AccentIcon } from "@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg";
import { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { Button } from "../../buttons/button";
import { ButtonArgs } from "../../buttons/button/_types";
import { getColor } from "../../theme/utils";

export interface GlobalAlertProps extends Omit<IGlobalAlertProps, "type"> {
  type: IGlobalAlertProps["type"] | "accent" | "primary";
  message?: ReactNode;
  dismissable?: boolean;
  onClose?: () => void;
  cta?: {
    label: ReactNode;
    onClick?: () => void;
    buttonProps?: ButtonArgs;
  };
}

const StyledGlobalAlert = styled(ZendeskGlobalAlert)<GlobalAlertProps>`
  // general
  align-items: center;
  [data-garden-id="notifications.global-alert.icon"] {
    margin-top: -2px;
  }
  .global-alert-icon {
    flex-shrink: 0;
    margin-top: -2px;
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  .global-alert-cta {
    flex-shrink: 0;
  }

  // looks like the following rules get overwritten by garden if we use props.type directly instead of alerttype
  // or even in file component.ts of the theme

  // Primary
  &[alerttype="primary"] {
    background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 100)};
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 700)};
    box-shadow: 0 1px 1px
      ${({ theme }) => getColor(theme.colors.primaryHue, 300)};

    [data-garden-id="notifications.global-alert.content"] {
      color: ${({ theme }) => getColor(theme.colors.primaryHue, 700)};
    }
    [data-garden-id="notifications.global-alert.title"] {
      color: ${({ theme }) => getColor(theme.colors.primaryHue, 800)};
    }
    [data-garden-id="buttons.anchor"] {
      color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
    }
    .global-alert-icon {
      color: ${({ theme }) => getColor(theme.colors.primaryHue, 700)};
    }
  }

  // Accent
  &[alerttype="accent"] {
    background-color: ${({ theme }) => theme.palette.blue[100]};
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 700)};
    box-shadow: 0 1px 1px
      ${({ theme }) => getColor(theme.colors.accentHue, 600)};

    [data-garden-id="notifications.global-alert.content"] {
      color: ${({ theme }) => getColor(theme.colors.accentHue, 700)};
    }
    [data-garden-id="notifications.global-alert.title"] {
      color: ${({ theme }) => getColor(theme.colors.accentHue, 800)};
    }
    [data-garden-id="buttons.anchor"] {
      color: ${({ theme }) => getColor(theme.colors.accentHue, 700)};
    }
    .global-alert-icon {
      color: ${({ theme }) => getColor(theme.colors.accentHue, 700)};
    }
  }

  // Info
  &[alerttype="info"] {
    background-color: ${({ theme }) => getColor(theme.colors.infoHue, 100)};
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 700)};

    [data-garden-id="notifications.global-alert.content"] {
      color: ${({ theme }) => getColor(theme.colors.infoHue, 700)};
    }
    [data-garden-id="notifications.global-alert.title"] {
      color: ${({ theme }) => getColor(theme.colors.infoHue, 800)};
    }
    [data-garden-id="buttons.anchor"] {
      color: ${({ theme }) => getColor(theme.colors.infoHue, 700)};
    }
    [data-garden-id="notifications.global-alert.icon"] {
      color: ${({ theme }) => getColor(theme.colors.infoHue, 700)};
    }
  }

  // Error
  &[alerttype="error"] {
    .global-alert-cta {
      background-color: ${({ theme }) => getColor(theme.colors.dangerHue, 800)};
    }
  }

  // Warning
  &[alerttype="warning"] {
    background-color: ${({ theme }) => getColor(theme.colors.warningHue, 300)};
    box-shadow: 0 1px 1px
      ${({ theme }) => getColor(theme.colors.warningHue, 600)};
    .global-alert-cta {
      background-color: ${({ theme }) =>
        getColor(theme.colors.warningHue, 800)};
    }
  }

  // Success
  &[alerttype="success"] {
    background-color: ${({ theme }) => getColor(theme.colors.successHue, 700)};
    box-shadow: 0 1px 1px
      ${({ theme }) => getColor(theme.colors.successHue, 700)};
    color: ${({ theme }) => getColor(theme.colors.successHue, 50)};
    .global-alert-cta {
      background-color: ${({ theme }) =>
        getColor(theme.colors.successHue, 800)};
    }
  }
`;

export const GlobalAlert = forwardRef<HTMLDivElement, GlobalAlertProps>(
  ({ type, onClose, dismissable, cta, title, message, ...props }, ref) => (
    <StyledGlobalAlert ref={ref} type={type} {...props}>
      {type === "accent" && <AccentIcon className="global-alert-icon" />}
      {type === "primary" && <PrimaryIcon className="global-alert-icon" />}
      <StyledGlobalAlert.Content>
        {title && <StyledGlobalAlert.Title>{title}</StyledGlobalAlert.Title>}
        {message}
      </StyledGlobalAlert.Content>
      {cta && (
        <Button
          {...cta.buttonProps}
          onClick={cta.onClick}
          className="global-alert-cta"
          isPill
          isPrimary
          size="small"
          isAccent={type === "accent"}
        >
          {cta.label}
        </Button>
      )}
      {dismissable && (
        <StyledGlobalAlert.Close
          aria-label="Close Global Alert"
          onClick={onClose}
        />
      )}
    </StyledGlobalAlert>
  )
);
