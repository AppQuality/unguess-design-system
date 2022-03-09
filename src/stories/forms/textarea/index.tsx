import { Textarea as ZendeskTextarea } from "@zendeskgarden/react-forms";
import { TextareaArgs } from "./_types";
import styled from "styled-components";

const UgTextarea = styled(ZendeskTextarea)``;

/**
   * A Textarea is a form control for multi-line text.
   * <hr>
   * Used for this:
   *  - To enter multi-line text
   **/
const Textarea = (props: TextareaArgs) => <UgTextarea {...props} />;

export { Textarea };
