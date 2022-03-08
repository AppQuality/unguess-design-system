import {
  Ellipsis as ZendeskEllipsis
} from "@zendeskgarden/react-typography";
import { EllipsisArgs } from "./_types";

/**
 *  Use Ellipsis to automatically provide text content with a native title attribute and text-overflow styling.
 */
const Ellipsis = (props: EllipsisArgs) => <ZendeskEllipsis {...props}/>;

export { Ellipsis };
