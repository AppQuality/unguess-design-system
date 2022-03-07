import { Code as ZendeskCode } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { CodeArgs } from "./_types";

const UgCode = styled(ZendeskCode)``;

/**
 *  Use Code to style and format inline fragments of computer code.
 */
const Code = (props: CodeArgs) => <UgCode {...props} />;

export { Code };
