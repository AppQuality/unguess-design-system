import {
  DrawerModal as ZendeskDrawerModal,
} from "@zendeskgarden/react-modals";
import { DrawerArgs } from "./_types";


const Drawer = (props: DrawerArgs) => <ZendeskDrawerModal {...props} />;
Drawer.Header = ZendeskDrawerModal.Header;
Drawer.Body = ZendeskDrawerModal.Body;
Drawer.Footer = ZendeskDrawerModal.Footer;
Drawer.FooterItem = ZendeskDrawerModal.FooterItem;
Drawer.Close = ZendeskDrawerModal.Close;



export { Drawer };
