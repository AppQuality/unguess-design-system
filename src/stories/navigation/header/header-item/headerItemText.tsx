import { HeaderItemText as ZendeskHeaderItemText } from "@zendeskgarden/react-chrome";
import styled from "styled-components";
import { HeaderItemTextArgs } from "./_types";

const UgHeaderItemText = styled(ZendeskHeaderItemText)`
    font-family: ${({ theme }) => theme.fonts.system};
`;

const HeaderItemText = (props: HeaderItemTextArgs) => <UgHeaderItemText {...props} />;

export { HeaderItemText };
