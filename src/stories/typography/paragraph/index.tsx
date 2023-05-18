import {
  IParagraphProps,
  Paragraph as ZendeskParagraph
} from "@zendeskgarden/react-typography";
import styled from "styled-components";

const UgParagraph = styled(ZendeskParagraph)`
  > div, p {
    color: ${p => p.color || p.theme.palette.grey[700]};
  }
`;

/**
 *  Use Paragraph to render blocks of text with Garden styling.
 */
const Paragraph = (props: IParagraphProps) => <UgParagraph {...props} />;

export { Paragraph};
