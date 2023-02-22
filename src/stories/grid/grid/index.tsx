import { Grid as ZendeskGrid } from "@zendeskgarden/react-grid";
import { GridArgs } from "./_types";

/**
 * The Grid component is a framework for building modular layouts.
 * <hr>
 * Used for this:
    - To structure the layout of a page
 */
const Grid = ({ gutters = false, ...props }: GridArgs) => (
  <ZendeskGrid gutters={gutters} {...props} />
);

export { Grid };
