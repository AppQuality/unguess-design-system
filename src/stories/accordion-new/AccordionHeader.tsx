import { Accordion as ZendeskAccordion } from "@zendeskgarden/react-accordions";
import { Checkbox, Field, Label } from "@zendeskgarden/react-forms";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../theme";

interface AccordionHeaderArgs extends React.HTMLAttributes<HTMLDivElement> {
  hasCheckbox?: boolean;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  isSelected?: boolean;
}

export const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderArgs>(({
  children,
  isSelected,
  hasCheckbox,
  checkboxProps,
  ...rest
}, ref) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (typeof checkboxProps?.onChange === "function") {
      checkboxProps.onChange(e);
    }
    return false;
  }

  return (
    <ZendeskAccordion.Header ref={ref} {...rest}>
      {hasCheckbox &&
        <Field onChange={handleCheckboxChange} style={{marginLeft: theme.space.md}}>
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
      {children}
    </ZendeskAccordion.Header>
  )
});