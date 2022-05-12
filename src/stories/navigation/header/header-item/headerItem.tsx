import { HeaderItem as ZendeskHeaderItem, HeaderItemWrapper as ZendeskHeaderItemWrapper } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { HeaderItemArgs, HeaderItemWrapperArgs } from "./_types";

const UgHeaderItem = styled(ZendeskHeaderItem)`
  ${(props) => props.hasLogo && `border-right: none`};
  font-family: ${({ theme }) => theme.fonts.system};
`;

const UgHeaderItemWrapper = styled(ZendeskHeaderItemWrapper)`
  font-family: ${({ theme }) => theme.fonts.system};
`;

const HeaderItem = (props: HeaderItemArgs) => <UgHeaderItem {...props} />;
const HeaderItemWrapper = (props: HeaderItemWrapperArgs) => <UgHeaderItemWrapper {...props} />;

export { HeaderItem, HeaderItemWrapper };
