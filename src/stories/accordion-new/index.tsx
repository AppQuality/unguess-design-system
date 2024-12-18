import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef } from "react";
import { IAccordionProps } from "@zendeskgarden/react-accordions";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionSection } from "./AccordionSection";
import { AccordionLabel } from "./AccordionLabel";
import { AccordionMeta } from "./AccordionMeta";

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



export const AccordionNew = AccordionComponent as typeof AccordionComponent & {
  Section: typeof AccordionSection;
  Header: typeof AccordionHeader;
  Label: typeof AccordionLabel;
  Meta: typeof AccordionMeta;
  Panel: typeof ZendeskAccordion.Panel;
};

AccordionNew.Section = AccordionSection;
AccordionNew.Header = AccordionHeader;
AccordionNew.Label = AccordionLabel;
AccordionNew.Meta = AccordionMeta;
AccordionNew.Panel = ZendeskAccordion.Panel;
