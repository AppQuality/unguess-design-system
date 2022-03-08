import { Grid as ZendeskGrid } from '@zendeskgarden/react-grid';
import { GridArgs } from './_types';

/**
 * The Grid component is a framework for building modular layouts.
 * <hr>
 * Used for this:
    - To structure the layout of a page
 */
const Grid = (props: GridArgs) => <ZendeskGrid {...props}/>;

export { Grid };
