import {
  Notification as ZendeskNotification,
  ToastProvider as ZendeskToastProvider,
  useToast as ZendeskUseToast,
} from "@zendeskgarden/react-notifications";
import { NotificationArgs, ToastProviderArgs } from "./_types";
import styled from "styled-components";
import { Anchor } from "@zendeskgarden/react-buttons";

const UgAnchor = styled(Anchor)`
  cursor: pointer;
`;

const UgNotification = styled(ZendeskNotification)<NotificationArgs>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  > svg {
    margin-top: 1px;
  }

  ${UgAnchor} {
    flex-shrink: 0;
    margin-left: ${({ theme }) => theme.space.md};
  }

  ${(props) =>
    props.type === ("success" as NotificationArgs["type"]) &&
    `
    background-color: ${props.theme.palette.green[700]};
    color: ${props.theme.palette.white};

    *, *:hover, *:focus, *:active {
      color: ${props.theme.palette.white} !important;
    }
  `}

  ${(props) =>
    props.type === ("error" as NotificationArgs["type"]) &&
    `
    background-color: ${props.theme.palette.red[600]};
    color: ${props.theme.palette.white};

    *, *:hover, *:focus, *:active {
      color: ${props.theme.palette.white} !important;
    }
  `}

  ${(props) =>
    props.type === ("warning" as NotificationArgs["type"]) &&
    `
    background-color: ${props.theme.palette.yellow[600]};
    color: ${props.theme.palette.white};

    *, *:hover, *:focus, *:active {
      color: ${props.theme.palette.white} !important;
    }
  `}

  ${(props) =>
    props.type === ("info" as NotificationArgs["type"]) &&
    props.isPrimary &&
    `
    background-color: ${props.theme.palette.blue[600]};
    color: ${props.theme.palette.white};

    *, *:hover, *:focus, *:active {
      color: ${props.theme.palette.white} !important;
    }
  `}
`;

/**
 * A Notification is a passive status update that keeps users informed of system progress.
 * <hr>
 * Used for this:
    - For a passive status update about user or system activity
 */
const Notification = ({
  children,
  closeText,
  onClose,
  ...props
}: NotificationArgs) => (
  <UgNotification {...props}>
    {children}
    <UgAnchor onClick={onClose}>{closeText ?? "Dismiss"}</UgAnchor>
  </UgNotification>
);

// ToastProvider
const ToastProvider = (props: ToastProviderArgs) => (
  <ZendeskToastProvider {...props} />
);
const useToast = ZendeskUseToast;

export { Notification, ToastProvider, useToast };
