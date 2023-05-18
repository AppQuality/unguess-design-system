import {
  IParagraphProps,
  Paragraph as ZendeskParagraph
} from "@zendeskgarden/react-typography";
import styled from "styled-components";

const UgParagraph = styled(ZendeskParagraph)<{color?: string}>`
  ${p => p.color && `
    > div {
      color: ${p.color};
    }
  `};
`;

/**
 *  Use Paragraph to render blocks of text with Garden styling.
 */
const Paragraph = (props: IParagraphProps) => <UgParagraph {...props} />;

export { Paragraph};
