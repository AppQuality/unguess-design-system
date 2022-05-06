import { IAlertProps } from '@zendeskgarden/react-notifications';

export interface AlertArgs extends IAlertProps {
  /** Applies alert type styles */
  type: 'success' | 'warning' | 'error' | 'info';
}
