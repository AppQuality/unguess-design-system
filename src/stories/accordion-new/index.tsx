import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef } from "react";
import { IAccordionProps } from "@zendeskgarden/react-accordions";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionSection } from "./AccordionSection";

export interface AccordionArgs extends IAccordionProps {
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



export const Accordion = AccordionComponent as typeof AccordionComponent & {
   Section: typeof AccordionSection;
   Header: typeof AccordionHeader;
   Label: typeof ZendeskAccordion.Label;
   Panel: typeof ZendeskAccordion.Panel;
 };

Accordion.Section = AccordionSection;
Accordion.Header = AccordionHeader;
Accordion.Label = ZendeskAccordion.Label;
Accordion.Panel = ZendeskAccordion.Panel;
