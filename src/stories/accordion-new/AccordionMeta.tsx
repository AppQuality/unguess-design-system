import { forwardRef} from "react";
import styled from "styled-components";

interface AccordionMetaArgs extends React.HTMLAttributes<HTMLDivElement> {
}
const StyledAccordionMeta = styled.div<AccordionMetaArgs>`
`;

export const AccordionMeta = forwardRef<HTMLDivElement, AccordionMetaArgs>(({
  children,
  ...rest
}, ref) => (
  <StyledAccordionMeta ref={ref} {...rest}>
    {children}
  </StyledAccordionMeta>
));
