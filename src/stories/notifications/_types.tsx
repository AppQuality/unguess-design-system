import { INotificationProps, IToastProviderProps } from "@zendeskgarden/react-notifications";

export interface NotificationArgs extends INotificationProps {
  type?: "success" | "error" | "warning" | "info";
  isPrimary?: boolean;
  isRegular?: boolean;
  message?: string;
  onClose?: () => void;
  closeText?: string;
}

export interface ToastProviderArgs extends IToastProviderProps {}