import {
  Blockquote as ZendeskBlockquote
} from "@zendeskgarden/react-typography";
import { BlockquoteArgs } from "./_types";

/**
 *  Use Blockquote to represent a body of text that is from another source.
 */
const Blockquote = (props: BlockquoteArgs) => <ZendeskBlockquote {...props}/>;

export { Blockquote };
