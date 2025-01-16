import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { Checkbox, Field, Label } from "@zendeskgarden/react-forms";
import { forwardRef } from "react";
import styled from "styled-components";

export interface AccordionSectionArgs extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}

export const AccordionSection = forwardRef<HTMLDivElement, AccordionSectionArgs>(({
  children,
  isSelected,
  className,
  ...rest 
}, ref) => (
  <ZendeskAccordion.Section ref={ref} className={`${className} ${isSelected ? 'isSelected' : ''}`} {...rest}>
    {children}
  </ZendeskAccordion.Section>
));