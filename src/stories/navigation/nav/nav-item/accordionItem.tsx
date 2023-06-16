import styled from "styled-components";
import { Accordion } from "../../../accordions";
import { AccordionArgs } from "../../../accordions/_types";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
} from "../../../theme/utils";
import { NavItemArgs } from "./_types";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

const NavAccordionItem = styled(Accordion)<AccordionArgs & NavItemArgs>`
  ${sidebarNavItemExpanded}
  ${props => !props.isExpanded && sidebarNavItemHidden}
  order: 1;
  margin: ${({ theme }) => theme.space.xs} 0;
  padding-left: 8.5px;
`;

const AccordionItemHeader = styled(Accordion.Header)<
  AccordionArgs & NavItemArgs
>`
  > svg {
    flex-shrink: 0;
    
    &:first-of-type {
      margin: 0 8.5px;
    }
  }
`;

const AccordionItemPanel = styled(Accordion.Panel)<AccordionArgs & NavItemArgs>`
  max-height: 180px;
  overflow-y: auto;
`;

const AccordionItemLabel = styled(Accordion.Label)<AccordionArgs & NavItemArgs>`
  ${props => retrieveComponentStyles("text.primary", props)}
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  padding: 0;
  margin: 0 8.5px;
`;

NavAccordionItem.Panel = AccordionItemPanel;
NavAccordionItem.Header = AccordionItemHeader;
NavAccordionItem.Label = AccordionItemLabel;

export { NavAccordionItem };
