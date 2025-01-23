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
  width: auto;
  flex-grow: 1;
`;

export const AccordionLabel = forwardRef<HTMLButtonElement, AccordionLabelArgs>(({
  label,
  supertitle,
  subtitle,
  ...rest
}, ref) => {

  const { isCompact } = useContext(AccordionContext);

  return <>
    {supertitle && <SM color={theme.palette.grey[700]} style={{ flex: "1 0 100%" }}>{supertitle}</SM>}
    <StyledAccordionLabel ref={ref} {...rest}>
      {label &&
        isCompact
        ? <MD isBold style={{ marginBottom: theme.space.xxs }}>{label}</MD>
        : <LG isBold style={{ marginBottom: theme.space.xxs }}>{label}</LG>
      }
      {subtitle &&
        isCompact
        ? <SM color={theme.palette.grey[600]} style={{ marginBottom: theme.space.xs }}>{subtitle}</SM>
        : <MD color={theme.palette.grey[600]} style={{ marginBottom: theme.space.xs }}>{subtitle}</MD>
      }
    </StyledAccordionLabel>
  </>
});
