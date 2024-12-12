import { Alert as ZendeskAlert, Title as ZendeskTitle, Close as ZendeskClose } from '@zendeskgarden/react-notifications';
import { IAlertProps } from '@zendeskgarden/react-notifications';


export interface AlertArgs extends IAlertProps {}

const Alert = (props: AlertArgs) => <ZendeskAlert {...props}/>;
Alert.Title = ZendeskTitle;
Alert.Close = ZendeskClose;

export { Alert };
