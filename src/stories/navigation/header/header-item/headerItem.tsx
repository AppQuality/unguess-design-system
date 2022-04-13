import { HeaderItem as ZendeskHeaderItem } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { HeaderItemArgs } from "./_types";

const UgHeaderItem = styled(ZendeskHeaderItem)`
  ${(props) => props.hasLogo && `border-right: none`};
  font-family: ${({ theme }) => theme.fonts.system};
`;

const HeaderItem = (props: HeaderItemArgs) => <UgHeaderItem {...props} />;

export { HeaderItem };
