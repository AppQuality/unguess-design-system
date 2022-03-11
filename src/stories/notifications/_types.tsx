import { INotificationProps, IToastProviderProps } from "@zendeskgarden/react-notifications";

export interface NotificationArgs extends INotificationProps {
  /** Applies notification type styles */
  type?: "success" | "warning" | "error" | "info";
}

export interface ToastProviderArgs extends IToastProviderProps {
  /** Applies regular (non-bold) font weight */
  isRegular?: boolean;
}