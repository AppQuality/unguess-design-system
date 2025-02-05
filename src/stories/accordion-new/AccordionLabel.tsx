import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef, useContext } from "react";
import { theme } from "../theme";
import styled from "styled-components";
import { LG, MD, SM } from "../typography/typescale";
import { AccordionContext } from ".";

export interface AccordionLabelArgs extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  subtitle?: string;
  supertitle?: string;
}
const StyledAccordionLabel = styled(ZendeskAccordion.Label) <AccordionLabelArgs>`
  padding: 0;
  grid-area: label;
  div + div {
    margin-top: ${theme.space.xxs};
  }
`;

const StyledSuperTitle = styled(SM)`
  grid-area: supertitle;
  color: ${theme.palette.grey[700]};
  margin-bottom: ${theme.space.xxs};
`;

export const AccordionLabel = forwardRef<HTMLButtonElement, AccordionLabelArgs>(({
  label,
  supertitle,
  subtitle,
  ...rest
}, ref) => {

  const { isCompact } = useContext(AccordionContext);
  return <>
    {supertitle && <StyledSuperTitle>{supertitle}</StyledSuperTitle>}
    <StyledAccordionLabel ref={ref} {...rest}>
      {label ?
        isCompact
        ? <MD isBold>{label}</MD>
        : <LG isBold>{label}</LG>
        : null
      }
      {subtitle ?
        isCompact
        ? <SM color={theme.palette.grey[600]}>{subtitle}</SM>
        : <MD color={theme.palette.grey[600]}>{subtitle}</MD>
        : null
      }
    </StyledAccordionLabel>
  </>
});
