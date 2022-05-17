import { Timeline as ZendeskTimeline } from "@zendeskgarden/react-accordions";
import { TimelineArgs } from "./_types";
import styled from "styled-components";

const UgTimeline = styled(ZendeskTimeline)``;

const UgTimelineContent = styled(ZendeskTimeline.Content)``;

const UgTimelineItem = styled(ZendeskTimeline.Item)<TimelineArgs>`
  div[data-garden-id="timeline.content.separator"] {
    &:after {
      border-left-color: ${({ theme }) => theme.palette.grey[300]};
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${({ hiddenLine }) =>
    hiddenLine &&
    `
    div[data-garden-id="timeline.content.separator"] {
      &:after {
        border-left-color: transparent;
      }
    }
  `}
`;

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

Timeline.Item = UgTimelineItem;
Timeline.Content = UgTimelineContent;

export { Timeline };
