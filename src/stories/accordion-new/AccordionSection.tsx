import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef, useContext } from "react";
import styled from "styled-components";
import { AccordionContext } from ".";
import { getColor } from "../theme/utils";

export interface AccordionSectionArgs extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}

const StyledAccordionSection = styled(ZendeskAccordion.Section) <{ $hasBorder?: boolean, $hasShadow?: boolean, $type?: "default" | "primary" | "danger" | "warning" | "success" | "info" }>`
  --semantic-color: ${props => props.theme.palette.grey[300]};

  ${props => props.$type === 'primary' && `
    --semantic-color: ${getColor(props.theme.colors.primaryHue, 600)};
    --box-shadow-color: ${getColor(props.theme.colors.primaryHue, 600, props.theme, 0.2)};
  `};
  ${props => props.$type === 'success' && `
    --semantic-color: ${getColor(props.theme.colors.successHue, 600)};
    --box-shadow-color: ${getColor(props.theme.colors.successHue, 600, props.theme, 0.2)};
  `};
  ${props => props.$type === 'warning' && `
    --semantic-color: ${getColor(props.theme.colors.warningHue, 700)};
    --box-shadow-color: ${getColor(props.theme.colors.warningHue, 700, props.theme, 0.2)};
  `};
  ${props => props.$type === 'danger' && `
    --semantic-color: ${getColor(props.theme.colors.dangerHue, 900)};
    --box-shadow-color: ${getColor(props.theme.colors.dangerHue, 900, props.theme, 0.2)};
  `};

  ${props => props.$hasBorder && `
    border: 2px solid var(--semantic-color);
    border-radius: ${props.theme.borderRadii.md};
    margin-bottom: ${props.theme.space.sm};
    background-color: ${props.theme.palette.white};

    box-shadow: 4px 4px 0px 0px var(--box-shadow-color);
    
    > section {
      border-bottom: none;
    }

    svg[data-garden-id='accordions.rotate_icon'] {
    color: var(--semantic-color);
  }
  `}
`;

export const AccordionSection = forwardRef<HTMLDivElement, AccordionSectionArgs>(({
  children,
  isSelected,
  className,
  ...rest
}, ref) => {
  const { hasBorder, hasShadow, type } = useContext(AccordionContext);
  return (
    <StyledAccordionSection
      ref={ref}
      className={`${className} ${isSelected ? 'isSelected' : ''}`}
      {...rest}
      $hasBorder={hasBorder}
      $hasShadow={hasShadow}
      $type={type}
    >
      {children}
    </StyledAccordionSection>
  )
});