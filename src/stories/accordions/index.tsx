import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef } from "react";
import { AccordionArgs } from "./_types";

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
   Section: typeof ZendeskAccordion.Section;
   Header: typeof ZendeskAccordion.Header;
   Label: typeof ZendeskAccordion.Label;
   Panel: typeof ZendeskAccordion.Panel;
 };

Accordion.Section = ZendeskAccordion.Section;
Accordion.Header = ZendeskAccordion.Header;
Accordion.Label = ZendeskAccordion.Label;
Accordion.Panel = ZendeskAccordion.Panel;
