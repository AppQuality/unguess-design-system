import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { Checkbox, Field, Label } from "@zendeskgarden/react-forms";
import { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { AccordionContext } from ".";
import { AccordionMeta } from "./AccordionMeta";
import { AccordionLabel } from "./AccordionLabel";

export interface AccordionHeaderArgs extends React.HTMLAttributes<HTMLDivElement> {
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  isSelected?: boolean;
  icon?: React.ReactNode;
}

const StyledAccordionHeader = styled(ZendeskAccordion.Header) <{ $isCompact?: boolean, $hasBorder?: boolean, $responsiveBreakpoint?: number }>` // transient props, prefixed with $, avoid react does not recognize the prop on a DOM element warning
  container-type: inline-size;
  container-name: accordion-header;
  padding-top: ${theme.space.md};
  padding-bottom: ${theme.space.md};
  padding-right: 0;
  padding-left: 0;
  ${props => props.$hasBorder ? `padding-left: ${theme.space.md}; padding-right: ${theme.space.xs};` : ""}
  display: flex;
  gap: ${theme.space.xs};
  align-items: flex-start;
  [data-garden-id="accordions.rotate_icon"] {
    padding: 0;
    padding-left: ${theme.space.sm};
    padding-right: ${theme.space.sm};
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .accordion-header-icon-wrapper {
    margin-top: ${p => p.$isCompact ? "2px" : "3px"};
    > svg {
     width: 16px;
     height: 16px;
    }
  }
  .accordion-header-inner-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: 
            "supertitle supertitle"
            "label meta";
    column-gap: ${theme.space.xs};
    row-gap: 0;
  }
  ${props => props.$responsiveBreakpoint && `
    @container accordion-header (max-width: ${props.$responsiveBreakpoint}px) {
      .accordion-header-inner-wrapper {
        grid-template-columns: 100%;
        grid-template-areas:
              "supertitle"
              "label"
              "meta";
      }
      [data-garden-id="accordions.button"] {
        margin-bottom: ${theme.space.xs};
      }
    }
  `}
`;

export const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderArgs>(({
  children,
  isSelected,
  checkboxProps,
  icon,
  ...rest
}, ref) => {

  const { hasCheckbox, isCompact, hasBorder, responsiveBreakpoint } = useContext(AccordionContext);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof checkboxProps?.onChange === "function") {
      checkboxProps.onChange(e);
    }
  }

  return (
    <StyledAccordionHeader ref={ref} $isCompact={isCompact} $hasBorder={hasBorder} $responsiveBreakpoint={responsiveBreakpoint} {...rest}>
      {hasCheckbox &&
        <Field onChange={handleCheckboxChange} style={{ marginTop: isCompact ? "0" : "1px" }}>
          <Checkbox
            {...checkboxProps}
            onChange={handleCheckboxChange}
          >
            {checkboxProps?.["aria-label"]}
            <Label hidden style={{ height: "16px" }}>
              {checkboxProps?.["aria-label"]}
            </Label>
          </Checkbox>
        </Field>}
      {icon &&
        <div className="accordion-header-icon-wrapper">{icon}</div>
      }
      <div className="accordion-header-inner-wrapper">
        {children}
      </div>
    </StyledAccordionHeader>
  )
});