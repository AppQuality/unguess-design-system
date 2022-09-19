import styled from "styled-components";
import { Accordion } from "../../../accordions";
import { AccordionArgs } from "../../../accordions/_types";
import {
  sidebarNavItemExpanded,
  sidebarNavItemHidden,
} from "../../../theme/utils";
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

  &:hover {
    background-color: ${(props) => props.theme.palette.kale["200"]};
  }
`;

const AccordionItemPanel = styled(Accordion.Panel)<AccordionArgs & NavItemArgs>`
  max-height: 180px;
  padding: 0;
  padding-left: 5px;
  overflow-y: auto;
  opacity: 1;
`;

const AccordionItemLabel = styled(Accordion.Label)<AccordionArgs & NavItemArgs>`
  padding: 12px 9px;
  ${({ theme }) => `
    color: ${theme.colors.primaryHue};
    fill: ${theme.colors.primaryHue};
    font-weight: ${theme.fontWeights.medium};
  `}
`;

AccordionItem.Panel = AccordionItemPanel;
AccordionItem.Header = AccordionItemHeader;
AccordionItem.Label = AccordionItemLabel;

export { AccordionItem };
