import {
  Paragraph as ZendeskParagraph,
  SM as ZendeskSM,
  MD as ZendeskMD,
  LG as ZendeskLG,
} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { ParagraphArgs, SMArgs, MDArgs, LGArgs } from "./_types";

const UgParagraph = styled(ZendeskParagraph)``;

/**
 *  Use Paragraph to render blocks of text with Garden styling.
 */
const Paragraph = (props: ParagraphArgs) => <UgParagraph {...props} />;

const SM = (props: SMArgs) => <ZendeskSM {...props}/>;
const MD = (props: MDArgs) => <ZendeskMD {...props}/>;
const LG = (props: LGArgs) => <ZendeskLG {...props}/>;


export { Paragraph, SM, MD, LG };
