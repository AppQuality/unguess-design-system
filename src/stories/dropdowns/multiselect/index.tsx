import { Multiselect as ZendeskMultiselect } from "@zendeskgarden/react-dropdowns";
import { MultiselectArgs } from "./_types";

/**
 * Multiselect lets users select multiple items from a list. Options are dynamically filtered as a user types in the input field and their selections appear as tags in the input field.
 * <hr>
 * Used for this:
    - To choose multiple items from a list of options
    - To filter through a set of data by typing
 */
const Multiselect = (props: MultiselectArgs) => (
  <ZendeskMultiselect {...props} />
);

export { Multiselect };
