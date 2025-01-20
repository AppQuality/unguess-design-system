import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { forwardRef, useContext } from "react";
import styled from "styled-components";
import { AccordionContext } from ".";
import { getColor } from "../theme/utils";

export interface AccordionSectionArgs
  extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}

const StyledAccordionSection = styled(ZendeskAccordion.Section)<{
  $hasBorder?: boolean;
  $type?: "default" | "primary" | "danger" | "warning" | "success" | "info";
}>`
  --semantic-color: ${(props) => getColor(props.theme.colors.neutralHue, 300)};
  --box-shadow-color: ${(props) =>
    getColor(props.theme.colors.neutralHue, 600, props.theme, 0.08)};
  --box-shadow-color-hover: ${(props) =>
    getColor(props.theme.colors.neutralHue, 600, props.theme, 0.2)};

  ${(props) =>
    props.$type === "primary" &&
    `
    --semantic-color: ${getColor(props.theme.colors.primaryHue, 600)};
    --box-shadow-color: ${getColor(props.theme.colors.primaryHue, 600, props.theme, 0.08)};
    --box-shadow-color-hover: ${getColor(props.theme.colors.primaryHue, 600, props.theme, 0.2)};
  `};
  ${(props) =>
    props.$type === "success" &&
    `
    --semantic-color: ${getColor(props.theme.colors.successHue, 600)};
    --box-shadow-color: ${getColor(props.theme.colors.successHue, 600, props.theme, 0.08)};
    --box-shadow-color-hover: ${getColor(props.theme.colors.successHue, 600, props.theme, 0.2)};
  `};
  ${(props) =>
    props.$type === "warning" &&
    `
    --semantic-color: ${getColor(props.theme.colors.warningHue, 700)};
    --box-shadow-color: ${getColor(props.theme.colors.warningHue, 700, props.theme, 0.08)};
    --box-shadow-color-hover: ${getColor(props.theme.colors.warningHue, 700, props.theme, 0.2)};
  `};
  ${(props) =>
    props.$type === "danger" &&
    `
    --semantic-color: ${getColor(props.theme.colors.dangerHue, 900)};
    --box-shadow-color: ${getColor(props.theme.colors.dangerHue, 900, props.theme, 0.08)};
    --box-shadow-color-hover: ${getColor(props.theme.colors.dangerHue, 900, props.theme, 0.2)};
  `};

  ${(props) =>
    props.$hasBorder &&
    `
    border: 2px solid var(--semantic-color);
    border-radius: ${props.theme.borderRadii.lg};
    margin-bottom: ${props.theme.space.md};
    background-color: ${props.theme.palette.white};

    box-shadow: 4px 4px 0px 0px var(--box-shadow-color);

    &:hover {
      box-shadow: 4px 4px 0px 0px var(--box-shadow-color-hover);
    }
    
    > section {
      border-bottom: none;
    }

    svg[data-garden-id='accordions.rotate_icon'] {
      color: ${props.$type === "default" || !props.$type ? getColor(props.theme.colors.neutralHue, 600) : "var(--semantic-color)"};
    }
  `}
`;

export const AccordionSection = forwardRef<
  HTMLDivElement,
  AccordionSectionArgs
>(({ children, isSelected, className, ...rest }, ref) => {
  const { hasBorder, type } = useContext(AccordionContext);
  return (
    <StyledAccordionSection
      ref={ref}
      className={`${className} ${isSelected ? "isSelected" : ""} accordion-section`}
      {...rest}
      $hasBorder={hasBorder}
      $type={type}
    >
      {children}
    </StyledAccordionSection>
  );
});
