import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef } from "react";
import { IAccordionProps } from "@zendeskgarden/react-accordions";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionSection } from "./AccordionSection";
import { AccordionLabel } from "./AccordionLabel";
import { AccordionMeta } from "./AccordionMeta";
import { createContext } from 'react';

export interface AccordionArgs extends IAccordionProps {
  hasCheckbox?: boolean;
  responsiveBreakpoint?: number;
  hasBorder?: boolean;
  type?: "default" | "primary" | "danger" | "warning" | "success" | "info";
}
export interface AccordionContext {
  isCompact?: boolean;
  responsiveBreakpoint?: number;
  hasCheckbox?: boolean;
  hasBorder?: boolean;
  type?: "default" | "primary" | "danger" | "warning" | "success" | "info";
}

export const AccordionContext = createContext({} as AccordionContext);

/**
 * Accordions are headers that can be expanded to reveal content or collapsed to hide it.
 * <hr>
 * Used for this:
    - To organize related information into sections
    - To surface information through progressive disclosure
 */
const AccordionComponent = forwardRef<HTMLDivElement, AccordionArgs>((props, ref) => {
  const context = {
    isCompact: props.isCompact,
    responsiveBreakpoint: props.responsiveBreakpoint,
    hasCheckbox: props.hasCheckbox,
    hasBorder: props.hasBorder,
    type: props.type
  };
  return (
  <AccordionContext.Provider value={context}>
    <ZendeskAccordion ref={ref} {...props} />
  </AccordionContext.Provider>
)});



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
