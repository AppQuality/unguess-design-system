import { Input as ZendeskInput, Hint as ZendeskHint } from "@zendeskgarden/react-forms";
import { InputArgs } from "./_types";
import styled from "styled-components";

const UgInput = styled(ZendeskInput)``;
const Hint = styled(ZendeskHint)``;

/**
   * An Input lets users enter text into a field.
   * <hr>
   * Used for this:
   *  - To let the user enter data into a field
   *  - To enter multiline text, use a Textarea
   **/
const Input = (props: InputArgs) => <UgInput {...props} />;




export { Input, Hint };
