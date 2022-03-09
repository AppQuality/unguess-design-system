import { Checkbox as ZendeskCheckbox, Field as ZendeskField, Label as ZendeskLabel } from "@zendeskgarden/react-forms";
import { CheckboxArgs, FieldArgs, LabelArgs } from "./_types";
import styled from "styled-components";

const UgCheckbox = styled(ZendeskCheckbox)``;
const UgField = styled(ZendeskField)``;
const UgLabel = styled(ZendeskLabel)``;

/**
   * A Checkbox lets users select and unselect options from a list.
   * <hr>
   * Used for this:
   *  - To let users compare options from a list and select all, any, or none of those items
   *  - To turn a single option on or off
   * Not for this:
   *  - To give the user a mutually exclusive choice, use the Radio component instead
   *  - To let users activate an option that takes effect immediately, use a Toggle instead
   **/
const Checkbox = (props: CheckboxArgs) => <UgCheckbox {...props} />;
const Field = (props: FieldArgs) => <UgField {...props} />;
const Label = (props: LabelArgs) => <UgLabel {...props} />;

export { Checkbox, Field, Label };
