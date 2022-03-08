import {
  Paragraph as ZendeskParagraph
} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { ParagraphArgs } from "./_types";

const UgParagraph = styled(ZendeskParagraph)``;

/**
 *  Use Paragraph to render blocks of text with Garden styling.
 */
const Paragraph = (props: ParagraphArgs) => <UgParagraph {...props} />;

export { Paragraph};
