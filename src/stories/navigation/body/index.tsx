import { Body as ZendeskBody } from "@zendeskgarden/react-chrome";
import { BodyArgs } from "./_types";
import styled from "styled-components";

const UgBody = styled(ZendeskBody)`
  background-color: ${({ theme }) => theme.palette.white};
`;

/**
 * A Body defines the main content of an HTML document which displays on the browser
 */
const Body = (props: BodyArgs) => <UgBody {...props} />;

export { Body };
