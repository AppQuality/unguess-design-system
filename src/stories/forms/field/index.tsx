import {
  Field as ZendeskField,
  Hint as ZendeskHint,
} from "@zendeskgarden/react-forms";
import styled from "styled-components";
import { FieldArgs } from "./_types";

const UgField = styled(ZendeskField)``;

/**
 * A Field is a wrapper for input elements
 **/
const Field = (props: FieldArgs) => <UgField {...props} />;

export { Field as FormField, ZendeskHint as FormHint };
