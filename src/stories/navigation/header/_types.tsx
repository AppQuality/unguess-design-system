import { IHeaderProps } from '@zendeskgarden/react-chrome';

export interface HeaderArgs extends IHeaderProps {
    /** Displays logo for standlone usage  */
    isStandalone?: boolean;
}