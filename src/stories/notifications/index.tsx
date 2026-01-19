import { Anchor } from "@zendeskgarden/react-buttons";
import {
  Notification as ZendeskNotification,
  ToastProvider as ZendeskToastProvider,
  useToast as ZendeskUseToast,
} from "@zendeskgarden/react-notifications";
import { componentStyles } from "@zendeskgarden/react-theming";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Close } from "../close";
import { getColor } from "../theme/utils";
import { Title } from "../title";
import { NotificationArgs, ToastProviderArgs } from "./_types";

const NOTIFICATION_COMPONENT_ID = "notifications.notification";
const CLOSE_COMPONENT_ID = "notifications.notification.close";
const CLOSE_ICON_COMPONENT_ID = "notifications.notification.close-icon";
const TITLE_COMPONENT_ID = "notifications.notification.title";

const UgClose = styled(Close).attrs<{
  "data-custom-id"?: string;
}>((props) => ({
  "data-custom-id": props["data-custom-id"] ?? CLOSE_ICON_COMPONENT_ID,
}))`
  ${(props) =>
    componentStyles({
      theme: props.theme,
      componentId: CLOSE_ICON_COMPONENT_ID,
    })};
`;

const UgAnchor = styled(Anchor).attrs<{
  "data-custom-id"?: string;
}>((props) => ({
  "data-custom-id": props["data-custom-id"] ?? CLOSE_COMPONENT_ID,
}))<{
  type: NotificationArgs["type"];
  isPrimary?: boolean;
}>`
  ${(props) =>
    componentStyles({ theme: props.theme, componentId: CLOSE_COMPONENT_ID })};
`;

const UgTitle = styled(Title).attrs<{
  "data-custom-id"?: string;
}>((props) => ({
  "data-custom-id": props["data-custom-id"] ?? TITLE_COMPONENT_ID,
}))<{
  type: NotificationArgs["type"];
  isPrimary?: boolean;
}>`
  ${(props) =>
    componentStyles({ theme: props.theme, componentId: TITLE_COMPONENT_ID })};
`;

const UgNotification = styled(ZendeskNotification)<NotificationArgs>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.space.md};
  white-space: pre;

  ${UgAnchor} {
    flex-shrink: 0;
    margin-left: ${({ theme }) => theme.space.md};
  }

  ${(props) => {
    const { type, isPrimary, theme } = props;
    if (!isPrimary) return;

    const backgroundColor =
      type === "success"
        ? getColor(theme.colors.successHue, 700)
        : type === "warning"
          ? getColor(theme.colors.warningHue, 700)
          : type === "error"
            ? getColor(theme.colors.dangerHue, 700)
            : type === "info"
              ? getColor(theme.colors.infoHue, 700)
              : theme.palette.grey[100];

    return `
      background-color: ${backgroundColor};
      [data-garden-id="notifications.title"],
      [data-custom-id="notifications.notification.close"],
      svg {
          color: ${theme.palette.white};
      }
      
      

    `;
  }}};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    padding: ${({ theme }) => theme.space.md};
    width: 300px; // Set a fixed width for better mobile appearance
    white-space: normal;
    justify-content: center;

    > svg {
      display: none;
    }

    ${({ closeText, theme }) =>
      !closeText &&
      `
      a[data-custom-id="notifications.notification.close"] {
        margin: 0;
        position: absolute;
        top: ${theme.space.xxs};
        right:  ${theme.space.xxs};
      }
    `}

    ${UgTitle} {
      text-align: center;
    }

    ${UgAnchor} {
      margin: auto;
      margin-top: ${({ theme }) => theme.space.sm};
    }
  }
`;

/**
 * A Notification is a passive status update that keeps users informed of system progress.
 * <hr>
 * Used for this:
    - For a passive status update about user or system activity
 */
const Notification = ({
  message,
  onClose,
  type,
  isPrimary,
  isRegular,
  ...props
}: NotificationArgs) => (
  <UgNotification type={type} isPrimary={isPrimary} {...props}>
    <UgTitle isRegular={isRegular} type={type} isPrimary={isPrimary}>
      {message}
    </UgTitle>
    <UgAnchor type={type} isPrimary={isPrimary} onClick={onClose}>
      {props.closeText ?? <UgClose />}
    </UgAnchor>
  </UgNotification>
);

// ToastProvider
const ToastProvider = (props: PropsWithChildren<ToastProviderArgs>) => (
  <ZendeskToastProvider {...props} />
);
const useToast = ZendeskUseToast;

export { Notification, ToastProvider, useToast };
