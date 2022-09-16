import styled from "styled-components";
import { Accordion } from "../../../accordions";
import { AccordionArgs } from "../../../accordions/_types";
import { NavItemArgs } from "./_types";

const AccordionItem = styled(Accordion)<AccordionArgs & NavItemArgs>`
  ${(props) => !props.isExpanded && "display: none;"}
  order: 1;
`;

const AccordionItemHeader = styled(Accordion.Header)<
  AccordionArgs & NavItemArgs
>`
  flex-direction: row-reverse;
  border-top-left-radius: ${(props) => props.theme.space.base * 6}px;
  border-bottom-left-radius: ${(props) => props.theme.space.base * 6}px;

  &:hover {
    background-color: ${(props) => props.theme.palette.kale["100"]};
  }
`;

const AccordionItemPanel = styled(Accordion.Panel)<AccordionArgs & NavItemArgs>`
  max-height: 180px;
  padding: 0;
  padding-left: 5px;
  overflow-y: auto;
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
