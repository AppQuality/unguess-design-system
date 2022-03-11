import { Span as ZendeskSpan } from "@zendeskgarden/react-typography";
import { SpanArgs } from "./_types";

/**
 * Use Span to style and format inline text elements.
 * <hr>
 * Used for this:
    - To apply styles to short strings of text
    - To include icons inline with text
 * Not for this:
    - To style an entire block of text, use Paragraph instead
 */
const Span = (props: SpanArgs) => <ZendeskSpan {...props} />;

export { Span };
