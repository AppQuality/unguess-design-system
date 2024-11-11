import {
  GlobalAlert as ZendeskGlobalAlert,
  IGlobalAlertProps
} from "@zendeskgarden/react-notifications";
import { forwardRef } from "react";

export interface GlobalAlertProps extends IGlobalAlertProps {}

const GlobalAlertComponent = forwardRef<HTMLDivElement, IGlobalAlertProps>((props, ref) => (
  <ZendeskGlobalAlert ref={ref} {...props} />
));

export const GlobalAlert = GlobalAlertComponent as typeof GlobalAlertComponent & {
  Title: typeof ZendeskGlobalAlert.Title;
  Button: typeof ZendeskGlobalAlert.Button;
  Close: typeof ZendeskGlobalAlert.Close;
  Content: typeof ZendeskGlobalAlert.Content;
};

GlobalAlert.Title = ZendeskGlobalAlert.Title;
GlobalAlert.Button = ZendeskGlobalAlert.Button;
GlobalAlert.Close = ZendeskGlobalAlert.Close;
GlobalAlert.Content = ZendeskGlobalAlert.Content;

