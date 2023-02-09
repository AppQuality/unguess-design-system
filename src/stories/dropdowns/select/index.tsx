import { PropsWithChildren } from "react";
import {
  Select as ZendeskSelect,
  Dropdown as ZendeskDropdown,
  Message as ZendeskMessage,
} from "@zendeskgarden/react-dropdowns";
import { StyledLabel } from "../../label";
import { SelectArgs, DropdownArgs, MessageArgs } from "./_types";
import styled from "styled-components";
import { MenuHeaderItem } from "../menuheader";
import { Separator } from "../menu";

const UgSelect = styled(ZendeskSelect)<SelectArgs>`
  ${(props) =>
    props.isPrimary &&
    `
      background-color: ${props.theme.palette.blue[600]};
      color: white;
      & svg[data-garden-id="forms.media_figure"] {
         color: white;
      }
   `}
`;

/**
 * Select allows a user to pick one option from a list. This helps simplify the UI when space is limited
 * <hr>
 * Used for this:
    - To make a selection from a list of options
 * Not for this:
    - To filter a large list of options, use Autocomplete instead
    - To make multiple selections from a list, use Multiselect instead
    - To select from a list on mobile, use a native Select instead
 */
const Select = (props: SelectArgs) => <UgSelect {...props} />;

const StyledDropdown = styled.div`
  ${StyledLabel} {
    display: block;
  }
`;

const StyledMenuHeaderItem = styled(MenuHeaderItem)`
  pointer-events: none;
`;

const Dropdown = (props: PropsWithChildren<DropdownArgs>) => (
  <StyledDropdown>
    <ZendeskDropdown {...props} />
  </StyledDropdown>
);
const Message = (props: MessageArgs) => <ZendeskMessage {...props} />;

Dropdown.HeaderItem = StyledMenuHeaderItem;
Dropdown.Separator = Separator;

export { Select, Dropdown, Message };
