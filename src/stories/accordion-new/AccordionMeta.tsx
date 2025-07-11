import { forwardRef } from "react";
import styled from "styled-components";

export interface AccordionMetaArgs
  extends React.HTMLAttributes<HTMLDivElement> {}
const StyledAccordionMeta = styled.div<AccordionMetaArgs>`
  grid-area: meta;
`;

export const AccordionMeta = forwardRef<HTMLDivElement, AccordionMetaArgs>(
  ({ children, ...rest }, ref) => (
    <StyledAccordionMeta ref={ref} {...rest}>
      {children}
    </StyledAccordionMeta>
  )
);
