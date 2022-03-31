import { Field as ZendeskField, Hint as ZendeskHint } from "@zendeskgarden/react-forms";
import { FieldArgs } from "./_types";
import styled from "styled-components";

const UgField = styled(ZendeskField)``;

/**
   * A Field is a wrapper for input elements
   **/
const Field = (props: FieldArgs) => <UgField {...props} />;

export { Field, ZendeskHint as Hint };
