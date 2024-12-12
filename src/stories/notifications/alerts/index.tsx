import { Alert as ZendeskAlert, Title as ZendeskTitle, Close as ZendeskClose } from '@zendeskgarden/react-notifications';
import styled from 'styled-components';
import { AlertArgs } from './_types';

const UgAlert = styled(ZendeskAlert)`
   background-color: white;
   color: ${({ theme }) => theme.palette.grey[700]};
   border-width: 2px;
   font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const UgAlertTitle = styled(ZendeskTitle)`
   font-size: ${({ theme }) => theme.fontSizes.md};
`;

/**
 * Breadcrumbs mark and communicate a user’s location in the product.
 * <hr>
 * Used for this:
    - To show the user where they are in a nested navigation
    - To provide a quick way to navigate to ancestor pages
 */
const Alert = (props: AlertArgs) => <UgAlert {...props}/>;
Alert.Title = UgAlertTitle;
Alert.Close = ZendeskClose;

export { Alert };
