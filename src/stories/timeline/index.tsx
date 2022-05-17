import { Timeline as ZendeskTimeline } from "@zendeskgarden/react-accordions";
import { TimelineArgs } from "./_types";
import styled from "styled-components";

const UgTimeline = styled(ZendeskTimeline)``;

/**
 * A Timeline lists events over a period of time.
 * <hr>
 * Used for this:
    - To track an issue over time
    - To show events associated with an item
 * Not for this:
    - To guide users through a step by step process, use a Stepper instead
 */
const Timeline = (props: TimelineArgs) => <UgTimeline {...props} />;

Timeline.Item = ZendeskTimeline.Item;
Timeline.Content = ZendeskTimeline.Content;

export { Timeline };
