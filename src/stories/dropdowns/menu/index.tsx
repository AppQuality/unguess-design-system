import { 
   Menu as ZendeskMenu, 
   PreviousItem as ZendeskPreviousItem, 
   Separator as ZendeskSeparator, 
   NextItem as ZendeskNextItem 
} from "@zendeskgarden/react-dropdowns";
import { MenuArgs, NextItemArgs, PreviousItemArgs } from "./_types";
import styled from "styled-components";
import { LiHTMLAttributes } from "react";

const UgMenu = styled(ZendeskMenu)``;

/**
   * A Menu is a wrapper for items elements
   **/
const Menu = (props: MenuArgs) => <UgMenu {...props} />;

// Extras
const PreviousItem = (props: PreviousItemArgs) => <ZendeskPreviousItem {...props} />;
const Separator = (props: LiHTMLAttributes<HTMLLIElement>) => <ZendeskSeparator {...props} />;
const NextItem = (props: NextItemArgs) => <ZendeskNextItem {...props}/>;

export { Menu, PreviousItem, Separator, NextItem };
