import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { ButtonHTMLAttributes, forwardRef, HTMLAttributes, ReactNode } from "react";
import { IAccordionProps } from "@zendeskgarden/react-accordions";
import styled from "styled-components";
import { MD } from "../typography/typescale";

export interface AccordionArgs extends IAccordionProps<number> { }
export interface HeaderArgs extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hasCheckbox?: boolean;
  isSelected?: boolean;
  onSeleect?: () => void;
  isCompact?: boolean;
}

export interface LabelArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
}

/**
 * Accordions are headers that can be expanded to reveal content or collapsed to hide it.
 * <hr>
 * Used for this:
    - To organize related information into sections
    - To surface information through progressive disclosure
 */
const AccordionComponent = forwardRef<HTMLDivElement, AccordionArgs>((props, ref) => (
  <ZendeskAccordion ref={ref} {...props} />
));

const StyledHeader = styled(ZendeskAccordion.Header)`
`;

const StyledLabel = styled(ZendeskAccordion.Label)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${(props) => props.theme.space.xs};
`;

const AccordionHeader = forwardRef<HTMLDivElement, HeaderArgs>((props, ref) => (
  <StyledHeader ref={ref} {...props}>
    {props.children}
  </StyledHeader>
));

const AccordionLabel = forwardRef<HTMLButtonElement, LabelArgs>((props, ref) => (
  <StyledLabel ref={ref} {...props}>
    <MD isBold>{props.label}</MD>
    {props.children && <div>{props.children}</div>}
  </StyledLabel>
));

export const Accordion = AccordionComponent as typeof AccordionComponent & {
  Section: typeof ZendeskAccordion.Section;
  Header: typeof AccordionHeader;
  Label: typeof AccordionLabel;
  Panel: typeof ZendeskAccordion.Panel;
};

Accordion.Section = ZendeskAccordion.Section;
Accordion.Header = AccordionHeader;
Accordion.Label = AccordionLabel;
Accordion.Panel = ZendeskAccordion.Panel;
