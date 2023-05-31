import { IButtonGroupProps, ButtonGroup as ZendeskButtonGroup } from "@zendeskgarden/react-buttons";
import { forwardRef } from "react";

/**
A Button group lets users make a selection from a set of options.

This is a legacy component and may be deprecated in the future. UNGUESS does not presently recommend the use of Button groups.
**/
const ButtonGroup = forwardRef<HTMLDivElement, IButtonGroupProps>(
  (props, ref) => <ZendeskButtonGroup ref={ref} {...props} />
);

export { ButtonGroup };
