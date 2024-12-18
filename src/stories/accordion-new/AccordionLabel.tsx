import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef} from "react";
import { theme } from "../theme";
import styled from "styled-components";
import { LG, MD, SM } from "../typography/typescale";

interface AccordionLabelArgs extends React.HTMLAttributes<HTMLDivElement> {
  isLarge?: boolean;
  label?: string;
  subtitle?: string;
  supertitle?: string;
  meta?: React.ReactNode;
}
const StyledAccordionLabel = styled(ZendeskAccordion.Label)<AccordionLabelArgs>`
  padding: 0;
  width: auto;
  flex-grow: 1;
`;

export const AccordionLabel = forwardRef<HTMLButtonElement, AccordionLabelArgs>(({
  label,
  supertitle,
  subtitle,
  isLarge,
  ...rest
}, ref) => (
  <StyledAccordionLabel ref={ref} {...rest}>
    {supertitle && <SM color={theme.palette.grey[700]} style={{marginBottom: theme.space.xxs}}>{supertitle}</SM>}
    {label &&
      isLarge
        ? <LG isBold style={{marginBottom: theme.space.xxs}}>{label}</LG>
        : <SM isBold style={{marginBottom: theme.space.xxs}}>{label}</SM>
    }
    {subtitle && 
      isLarge
        ? <MD color={theme.palette.grey[600]} style={{marginBottom: theme.space.xs}}>{subtitle}</MD>
        : <SM color={theme.palette.grey[600]} style={{marginBottom: theme.space.xs}}>{subtitle}</SM>
    }
  </StyledAccordionLabel>
));
