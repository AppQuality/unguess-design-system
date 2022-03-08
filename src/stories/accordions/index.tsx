import { Accordion as ZendeskAccordion } from '@zendeskgarden/react-accordions';
import { AccordionProps } from './_types';

/**
 * Accordions are headers that can be expanded to reveal content or collapsed to hide it.
 * <hr>
 * Used for this:
    - To organize related information into sections
    - To surface information through progressive disclosure
 */
const Accordion = (props: AccordionProps) => <ZendeskAccordion {...props}/>;

Accordion.Section = ZendeskAccordion.Section;
Accordion.Header = ZendeskAccordion.Header;
Accordion.Label = ZendeskAccordion.Label;
Accordion.Panel = ZendeskAccordion.Panel;


export { Accordion };
