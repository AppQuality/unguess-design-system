import {
  IGlobalAlertProps,
  GlobalAlert as ZendeskGlobalAlert,
} from "@zendeskgarden/react-notifications";
import { getColor } from "@zendeskgarden/react-theming";
import { ReactComponent as PrimaryIcon } from "@zendeskgarden/svg-icons/src/16/gear-stroke.svg";
import { ReactComponent as AccentIcon } from "@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg";
import { ComponentProps, forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { Button } from "../../buttons/button";
import { ButtonArgs } from "../../buttons/button/_types";

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

const StyledGlobalAlert = styled(ZendeskGlobalAlert)<
  GlobalAlertProps & { overrideType?: string }
>`
  // general
  align-items: center;

  ${({ overrideType, theme }) => {
    const backgroundColor = {
      success: "successHue",
      warning: "warningHue",
      error: "dangerHue",
      info: "infoHue",
      accent: "primaryHue",
      primary: "primaryHue",
    };
    const backgroundColorShade = {
      success: 700,
      warning: 400,
      error: 600,
      info: 100,
      accent: 100,
      primary: 100,
    };
    return `background-color: ${getColor({
      shade:
        backgroundColorShade[overrideType as keyof typeof backgroundColorShade],
      hue: backgroundColor[overrideType as keyof typeof backgroundColor],
      offset: 0,
      theme,
    })};`;
  }}

  ${({ overrideType, theme }) => {
    if (overrideType !== "accent") return "";

    return `border-color: ${getColor({
      shade: 500,
      hue: "accentHue",
      offset: 0,
      theme,
    })};`;
  }}

  ${({ overrideType }) =>
    overrideType &&
    ["primary", "accent"].includes(overrideType) &&
    `
  [data-garden-id="notifications.global_alert.icon"]  {
  display: none;
}
  `}

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

const GlobalAlertButton = (
  props: ComponentProps<typeof StyledGlobalAlert.Button> & {
    isPill?: boolean;
    isAccent?: boolean;
    isPrimary?: boolean;
    size?: "small" | "medium" | "large";
  }
) => {
  if (props.isAccent) return <Button {...props} />;
  return <StyledGlobalAlert.Button {...props} />;
};

export const GlobalAlert = forwardRef<HTMLDivElement, GlobalAlertProps>(
  ({ type, onClose, dismissable, cta, title, message, ...props }, ref) => {
    const mappedType = ["accent", "primary"].includes(type) ? "info" : type;
    return (
      <StyledGlobalAlert
        ref={ref}
        type={mappedType}
        overrideType={type}
        {...props}
      >
        {type === "accent" && <AccentIcon className="global-alert-icon" />}
        {type === "primary" && <PrimaryIcon className="global-alert-icon" />}
        <StyledGlobalAlert.Content>
          {title && <StyledGlobalAlert.Title>{title}</StyledGlobalAlert.Title>}
          {message}
        </StyledGlobalAlert.Content>
        {cta && (
          <GlobalAlertButton
            {...cta.buttonProps}
            onClick={cta.onClick}
            className="global-alert-cta"
            isPill
            isAccent={type === "accent"}
            isPrimary
            size="small"
          >
            {cta.label}
          </GlobalAlertButton>
        )}
        {dismissable && (
          <StyledGlobalAlert.Close
            aria-label="Close Global Alert"
            onClick={onClose}
          />
        )}
      </StyledGlobalAlert>
    );
  }
);
