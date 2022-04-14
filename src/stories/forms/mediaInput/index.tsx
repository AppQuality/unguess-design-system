import { MediaInput as ZendeskMediaInput } from "@zendeskgarden/react-forms";
import { MediaInputArgs } from "./_types";
import styled from "styled-components";

const UgMediaInput = styled(ZendeskMediaInput)``;

/**
   * Media elements add even more context to an input.
   * <hr>
   * Used for this:
   *  - To let the user enter data into a field
   *  - To enter multiline text, use a Textarea
   **/
const MediaInput = (props: MediaInputArgs) => <UgMediaInput {...props} />;

export { MediaInput };
