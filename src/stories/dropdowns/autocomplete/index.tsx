import {
  Autocomplete as ZendeskAutocomplete,
} from "@zendeskgarden/react-dropdowns";
import { AutocompleteArgs } from "./_types";


/**
 * Autocomplete is an input field that filters results as users type. This helps users find something quickly in a large list of options.
 * <hr>
 * Used for this:
    - To filter down a large list of options
    - To quickly find a known option
 * Not for this:
    - To make more than one selection, use Multiselect instead
 */
const Autocomplete = (props: AutocompleteArgs) => <ZendeskAutocomplete {...props} />;

export { Autocomplete };
