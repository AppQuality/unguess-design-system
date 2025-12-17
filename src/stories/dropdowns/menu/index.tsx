import {
  Item as ZendeskItem,
  Menu as ZendeskMenu,
  Separator as ZendeskSeparator,
} from "@zendeskgarden/react-dropdowns";
import { HTMLAttributes, LiHTMLAttributes } from "react";
import styled from "styled-components";
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
const Separator = (props: LiHTMLAttributes<HTMLLIElement>) => (
  <ZendeskSeparator {...props} />
);
const NextItem = (props: NextItemArgs) => (
  <ZendeskItem {...props} type="next" />
);
const ItemMeta = (props: HTMLAttributes<HTMLSpanElement>) => (
  <ZendeskItem.Meta {...props} />
);

export { Menu, PreviousItem, Separator, NextItem, ItemMeta };
