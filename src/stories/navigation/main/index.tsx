import { Main as ZendeskMain } from "@zendeskgarden/react-chrome";
import { MainArgs } from "./_types";
import styled from "styled-components";

const UgMain = styled(ZendeskMain)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.xxl }
  }
  
  /* hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * A Main defines the main content of an HTML document which displays on the browser
 */
const Main = (props: MainArgs) => <UgMain {...props} />;

export { Main };
