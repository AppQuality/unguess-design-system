import { Header as ZendeskHeader } from "@zendeskgarden/react-chrome";
import { HeaderItem, HeaderItemIcon, HeaderItemText } from "./header-item";
import styled from "styled-components";
import { HeaderArgs } from "./_types";
import { theme } from "../../theme";

const UgHeader = styled(ZendeskHeader)`
    height: ${theme.components.chrome.header.height};
    box-shadow: ${theme.shadows.headerShadow()};
`;


/**
 * An Header is a visual way to display general information.
 * This can include navList Items, modal, profile settings.
 */
const Header = (props: HeaderArgs) => <UgHeader {...props}/>;

Header.HeaderItem = HeaderItem;
Header.HeaderItemText = HeaderItemText;
Header.HeaderItemIcon = HeaderItemIcon;

export { Header };
