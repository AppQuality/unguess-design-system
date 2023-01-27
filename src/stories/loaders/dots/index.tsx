import { Dots as ZendeskDots } from '@zendeskgarden/react-loaders';
import { DotsArgs } from './_types';



/**
 * The Dots loader communicates ongoing activity after a user takes an action. 
 * It tells them that something is taking place.
 * <hr>
 * Used for this:
    - To indicate that a single component, like a Button or Search input, is doing something
   Not for this:
    - To communicate a page is loading, use a Skeleton loader or Spinner instead
    - To communicate typing status, use an Inline loader instead
    - To communicate progress, use a Progress loader instead
 */

const Dots = (props: DotsArgs) => <ZendeskDots {...props}/>;

export { Dots };
