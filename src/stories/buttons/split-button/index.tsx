import { SplitButton as ZendeskSplitButton } from "@zendeskgarden/react-buttons";
import { forwardRef } from "react";
import styled from "styled-components";
import { SplitButtonArgs } from "./_types";

const SplitButtonWrapper = styled.div`
  [data-garden-id="buttons.button"] {
    margin-right: -1px;
  }
`;

/**
A Split button is a hybrid between a Dropdown Menu and a Button. It lets users choose from parallel actions and take action on their choice.
<hr>
Used for this:
- To let users select from multiple parallel actions. Actions are parallel when each represents a path forward for the user and none cancel the action.
- To reduce visual complexity when there are multiple actions a user can take
**/
const SplitButton = forwardRef<HTMLDivElement, SplitButtonArgs>(
  (props, ref) => (
    <SplitButtonWrapper>
      <ZendeskSplitButton ref={ref} {...props} />
    </SplitButtonWrapper>
  )
);

export { SplitButton };
