import {
  Notification as ZendeskNotification,
  ToastProvider as ZendeskToastProvider,
  useToast as ZendeskUseToast,
} from "@zendeskgarden/react-notifications";
import { NotificationArgs, ToastProviderArgs } from "./_types";
import styled from "styled-components";
import { Anchor } from "@zendeskgarden/react-buttons";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";
import { Title } from "../title";
import { Close } from "../close";
import { PropsWithChildren } from "react";

const NOTIFICATION_COMPONENT_ID = "notifications.notification";
const CLOSE_COMPONENT_ID = "notifications.notification.close";
const CLOSE_ICON_COMPONENT_ID = "notifications.notification.close-icon";
const TITLE_COMPONENT_ID = "notifications.notification.title";

const UgClose = styled(Close).attrs({
  "data-custom-id": CLOSE_ICON_COMPONENT_ID,
})`
  ${(props) => retrieveComponentStyles(CLOSE_ICON_COMPONENT_ID, props)};
`;

const UgAnchor = styled(Anchor).attrs({
  "data-custom-id": CLOSE_COMPONENT_ID,
})<{
  type: NotificationArgs["type"];
  isPrimary?: boolean;
}>`
  ${(props) => retrieveComponentStyles(CLOSE_COMPONENT_ID, props)};
`;

const UgTitle = styled(Title).attrs({
  "data-custom-id": TITLE_COMPONENT_ID,
})<{
  type: NotificationArgs["type"];
  isPrimary?: boolean;
}>`
  ${(props) => retrieveComponentStyles(TITLE_COMPONENT_ID, props)};
`;

const UgNotification = styled(ZendeskNotification)<NotificationArgs>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${UgAnchor} {
    flex-shrink: 0;
    margin-left: ${({ theme }) => theme.space.md};
  }

  ${(props) => retrieveComponentStyles(NOTIFICATION_COMPONENT_ID, props)};
`;

/**
 * A Notification is a passive status update that keeps users informed of system progress.
 * <hr>
 * Used for this:
    - For a passive status update about user or system activity
 */
const Notification = ({
  closeText,
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
      {closeText ?? <UgClose />}
    </UgAnchor>
  </UgNotification>
);

// ToastProvider
const ToastProvider = (props: PropsWithChildren<ToastProviderArgs>) => (
  <ZendeskToastProvider {...props} />
);
const useToast = ZendeskUseToast;

export { Notification, ToastProvider, useToast };
