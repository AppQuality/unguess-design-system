import {
  IAlertProps,
  Alert as ZendeskAlert,
} from "@zendeskgarden/react-notifications";

export interface AlertArgs extends IAlertProps {}

const Alert = (props: AlertArgs) => <ZendeskAlert {...props} />;
Alert.Title = ZendeskAlert.Title;
Alert.Close = ZendeskAlert.Close;

export { Alert };
