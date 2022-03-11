import { Toggle as ZendeskToggle } from "@zendeskgarden/react-forms";
import { ToggleArgs } from "./_types";
import styled from "styled-components";

const UgToggle = styled(ZendeskToggle)``;

/**
   * A Toggle lets users turn something on and off like a light switch. Unlike a Checkbox, which is used for selection, a Toggle is used for activation.
   * <hr>
   * Used for this:
   *  - To see or compare the results of a settings change
   *  - To activate a mode (such as "dark mode") which takes immediate effect
   * Not for this:
   *  - To let users select from a list of settings, use Checkboxes instead
   **/
const Toggle = (props: ToggleArgs) => <UgToggle {...props} />;

export { Toggle };
