import { Autocomplete as ZendeskAutocomplete } from "@zendeskgarden/react-dropdowns";
import styled from "styled-components";
import { AutocompleteArgs } from "./_types";

const StyledAutocomplete = styled(ZendeskAutocomplete)`
  width: auto;
  min-width: auto;
  max-width: 100%;
`;

/**
 * Autocomplete is an input field that filters results as users type. This helps users find something quickly in a large list of options.
 * <hr>
 * Used for this:
    - To filter down a large list of options
    - To quickly find a known option
 * Not for this:
    - To make more than one selection, use Multiselect instead
 */
const Autocomplete = (props: AutocompleteArgs) => (
  <StyledAutocomplete {...props} />
);

export { Autocomplete };
