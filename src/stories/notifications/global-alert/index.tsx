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
