import {
  Item as ZendeskItem,
  Menu as ZendeskMenu,
} from "@zendeskgarden/react-dropdowns";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { Separator } from "../../profile-modal/components/Separator";
import { MenuArgs, NextItemArgs, PreviousItemArgs } from "./_types";

const StyledMenu = styled(ZendeskMenu)`
  width: auto !important;
`;

/**
 * A Menu is a wrapper for items elements
 **/
const Menu = (props: MenuArgs) => <StyledMenu {...props} />;

// Extras
const PreviousItem = (props: PreviousItemArgs) => (
  <ZendeskItem {...props} type="previous" />
);
const NextItem = (props: NextItemArgs) => (
  <ZendeskItem {...props} type="next" />
);
const ItemMeta = (props: HTMLAttributes<HTMLSpanElement>) => (
  <ZendeskItem.Meta {...props} />
);

export { ItemMeta, Menu, NextItem, PreviousItem, Separator };
