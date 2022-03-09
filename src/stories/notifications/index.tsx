import {
  Notification as ZendeskNotification,
  ToastProvider as ZendeskToastProvider,
  useToast as ZendeskUseToast,
} from "@zendeskgarden/react-notifications";
import { NotificationArgs, ToastProviderArgs } from "./_types";

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
const ToastProvider = (props: ToastProviderArgs) => <ZendeskToastProvider {...props}/>;
const useToast = ZendeskUseToast;

export { Notification, ToastProvider, useToast };
