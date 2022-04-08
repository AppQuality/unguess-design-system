import { 
   Menu as ZendeskMenu, 
   PreviousItem as ZendeskPreviousItem, 
   Separator as ZendeskSeparator, 
   NextItem as ZendeskNextItem,
   ItemMeta as ZendeskItemMeta,
   MediaBody as ZendeskMediaBody,
   MediaFigure as ZendeskMediaFigure,
   MediaItem as ZendeskMediaItem
} from "@zendeskgarden/react-dropdowns";
import { MenuArgs, NextItemArgs, PreviousItemArgs } from "./_types";
import styled from "styled-components";
import { HTMLAttributes, LiHTMLAttributes } from "react";

const UgMenu = styled(ZendeskMenu)``;

/**
   * A Menu is a wrapper for items elements
   **/
const Menu = (props: MenuArgs) => <UgMenu {...props} />;

// Extras
const PreviousItem = (props: PreviousItemArgs) => <ZendeskPreviousItem {...props} />;
const Separator = (props: LiHTMLAttributes<HTMLLIElement>) => <ZendeskSeparator {...props} />;
const NextItem = (props: NextItemArgs) => <ZendeskNextItem {...props}/>;
const ItemMeta = (props: HTMLAttributes<HTMLSpanElement>) => <ZendeskItemMeta {...props}/>;
const MediaBody = (props: HTMLAttributes<HTMLDivElement>) => <ZendeskMediaBody {...props}/>;
const MediaFigure = (props: HTMLAttributes<Element>) => <ZendeskMediaFigure {...props}/>;
const MediaItem = (props: LiHTMLAttributes<HTMLLIElement>) => <ZendeskMediaItem {...props}/>;

export { Menu, PreviousItem, Separator, NextItem, ItemMeta, MediaBody, MediaFigure, MediaItem };
