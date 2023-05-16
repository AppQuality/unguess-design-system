import {
  Paragraph as ZendeskParagraph
} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { ParagraphArgs } from "./_types";
import { palette } from "../../theme/palette";

const UgParagraph = styled(ZendeskParagraph)``;

/**
 *  Use Paragraph to render blocks of text with Garden styling.
 */
const Paragraph = (props: ParagraphArgs) => <UgParagraph {...props} style={{color: palette.grey[700]}} />;

export { Paragraph};
