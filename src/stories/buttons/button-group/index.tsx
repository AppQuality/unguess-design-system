import { ButtonGroup as ZendeskButtonGroup } from "@zendeskgarden/react-buttons";
import { ButtonGroupArgs } from "./_types";

/**
A Button group lets users make a selection from a set of options.

This is a legacy component and may be deprecated in the future. Garden does not presently recommend the use of Button groups.
**/
const ButtonGroup = (props: ButtonGroupArgs) => (
  <ZendeskButtonGroup {...props} />
);

export { ButtonGroup };
