import { Radio as ZendeskRadio } from "@zendeskgarden/react-forms";
import { RadioArgs } from "./_types";
import styled from "styled-components";

const UgRadio = styled(ZendeskRadio)``;

/**
   * Radio buttons let users choose a single option among two or more mutually exclusive options.
   * <hr>
   * Used for this:
   *  - For choices or options that can't occur at the same time
   *  - To indicate that two or more options are mutually exclusive
   * Not for this:
   *  - If the user can choose more than one option at once, use a Checkbox instead
   *  - To select from a long list of options, use Select instead
   **/
const Radio = (props: RadioArgs) => <UgRadio {...props} />;

export { Radio };
