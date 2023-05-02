import { INotificationProps, IToastProviderProps } from "@zendeskgarden/react-notifications";

export interface NotificationArgs extends INotificationProps {
  type?: "success" | "error" | "warning" | "info";
  isPrimary?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onClose?: () => void;
  closeText?: string;
}

export interface ToastProviderArgs extends IToastProviderProps {}