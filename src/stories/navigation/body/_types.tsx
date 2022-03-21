import { IBodyProps } from '@zendeskgarden/react-chrome';

export interface BodyProps extends IBodyProps {
    /** Adjusts the body content height to allow space for a footer component */
    hasFooter?: boolean;
}