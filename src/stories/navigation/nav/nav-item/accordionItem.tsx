import styled from "styled-components";
import { Accordion } from "../../../accordions";
import { AccordionArgs } from "../../../accordions/_types";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
} from "../../../theme/utils";
import {getColor} from "../../../theme/utils";
import { NavItemArgs } from "./_types";

const AccordionItem = styled(Accordion)<AccordionArgs & NavItemArgs>`
  opacity: 1;
  ${sidebarNavItemExpanded}
  ${(props) => !props.isExpanded && sidebarNavItemHidden}
  order: 1;
  margin-top: ${({ theme }) => theme.space.xs}px;
`;

const AccordionItemHeader = styled(Accordion.Header)<
  AccordionArgs & NavItemArgs
>`
  flex-direction: row-reverse;
  border-top-left-radius: ${({ theme }) => theme.space.base * 6}px;
  border-bottom-left-radius: ${({ theme }) => theme.space.base * 6}px;

  > button {
    padding-left: 2px;
  }

  svg {
    width: 26px;
  }
`;

const AccordionItemPanel = styled(Accordion.Panel)<AccordionArgs & NavItemArgs>`
  max-height: 180px;
  padding: 0;
  padding-left: 5px;
  overflow-y: hidden;
  opacity: 1;
  &:hover {
    overflow-y: auto;
  }
`;

const AccordionItemLabel = styled(Accordion.Label)<AccordionArgs & NavItemArgs>`
  padding: 12px 9px;
  ${({ theme }) => `
    color: ${getColor(theme.colors.primaryHue, 600)};
    fill: ${getColor(theme.colors.primaryHue, 600)};
    font-weight: ${theme.fontWeights.medium};
  `}
`;

AccordionItem.Panel = AccordionItemPanel;
AccordionItem.Header = AccordionItemHeader;
AccordionItem.Label = AccordionItemLabel;

export { AccordionItem };
