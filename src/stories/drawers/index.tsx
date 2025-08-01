import { DrawerModal as ZendeskDrawerModal } from "@zendeskgarden/react-modals";
import { DrawerArgs } from "./_types";
import styled from "styled-components";

const UgDrawer = styled(ZendeskDrawerModal)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const UgDrawerBody = styled(ZendeskDrawerModal.Body)`
  word-break: break-word;
`;

/**
 * A Drawer is a container for supplementary content that is anchored to the edge of a page.
 * <hr>
 * Used for this:
    - To display information or actions that are supplementary to the screen’s primary content
    - To display a list of actions that affect the screen’s content, such as filtering data
 */
const Drawer = (props: DrawerArgs) => <UgDrawer {...props} />;
Drawer.Header = ZendeskDrawerModal.Header;
Drawer.Body = UgDrawerBody;
Drawer.Footer = ZendeskDrawerModal.Footer;
Drawer.FooterItem = ZendeskDrawerModal.FooterItem;
Drawer.Close = ZendeskDrawerModal.Close;

export { Drawer };
