import {
  Notification as ZendeskNotification,
  Title as ZendeskTitle,
  Close as ZendeskClose,
  ToastProvider as ZendeskToastProvider,
  useToast as ZendeskUseToast,
} from "@zendeskgarden/react-notifications";
import { NotificationArgs, TitleArgs, ToastProviderArgs } from "./_types";
import { ButtonArgs } from "../buttons/button/_types";

/**
 * A Notification is a passive status update that keeps users informed of system progress.
 * <hr>
 * Used for this:
    - For a passive status update about user or system activity
 */
const Notification = (props: NotificationArgs) => (
  <ZendeskNotification {...props} />
);

//Extras
const Title = (props: TitleArgs) => <ZendeskTitle {...props} />;
const Close = (props: ButtonArgs) => <ZendeskClose {...props} />;
const ToastProvider = (props: ToastProviderArgs) => <ZendeskToastProvider {...props}/>;
const useToast = ZendeskUseToast;

export { Notification, Title, Close, ToastProvider, useToast };
