import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { Checkbox, Field, Label } from "@zendeskgarden/react-forms";
import { forwardRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { AccordionContext } from ".";

export interface AccordionHeaderArgs extends React.HTMLAttributes<HTMLDivElement> {
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  isSelected?: boolean;
  icon?: React.ReactNode;
}

const StyledAccordionHeader = styled(ZendeskAccordion.Header)`
  padding: ${theme.space.md};
  display: flex;
  gap: ${theme.space.xs};
  align-items: flex-start;
  [data-garden-id="accordions.rotate_icon"] {
    padding: 0;
  }
  .accordion-header-inner-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${theme.space.xs};
    width: 100%;
  }
`;

export const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderArgs>(({
  children,
  isSelected,
  checkboxProps,
  icon,
  ...rest
}, ref) => {
  
  const {hasCheckbox} = useContext(AccordionContext);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (typeof checkboxProps?.onChange === "function") {
      checkboxProps.onChange(e);
    }
    return false;
  }

  return (
    <StyledAccordionHeader ref={ref} {...rest}>
      {hasCheckbox &&
        <Field onChange={handleCheckboxChange}>
          <Checkbox
            {...checkboxProps}
            onChange={handleCheckboxChange}
          >
            {checkboxProps?.["aria-label"]}
            <Label hidden>
              {checkboxProps?.["aria-label"]}
            </Label>
          </Checkbox>
        </Field>}
      {icon}
      <div className="accordion-header-inner-wrapper">
      {children}
      </div>
    </StyledAccordionHeader>
  )
});