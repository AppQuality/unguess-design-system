import { Well as ZendeskWell } from '@zendeskgarden/react-notifications';
import { CardProps } from './_types';

/**
 * A Card is a container that groups related content.
 * <hr>
 * Used for this:
    - To group related content
 */
const Card = (props: CardProps) => <ZendeskWell {...props}/>;

export { Card };
