import { Main as ZendeskMain } from "@zendeskgarden/react-chrome";
import { MainArgs } from "./_types";
import styled from "styled-components";

const UgMain = styled(ZendeskMain)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 ${({ theme }) => theme.space.xxl }
  }
`;

/**
 * A Main defines the main content of an HTML document which displays on the browser
 */
const Main = (props: MainArgs) => <UgMain {...props} />;

export { Main };
