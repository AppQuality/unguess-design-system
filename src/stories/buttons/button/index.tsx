import { forwardRef } from "react";
import { Button as ZendeskButton } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { ButtonArgs } from "./_types";

const UgButton = styled(ZendeskButton)``;

/**
 * Buttons let users take action quickly.
 * Use a Button to enable actions or decisions that are important to a user’s workflow.
 * <hr>
 * Used for this:
   - To enable user action
   - To draw attention to relevant actions in a user's workflow
 */
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonArgs>(
  (props, ref) => {
    return <UgButton ref={ref} isPill {...props} />;
  }
);

export const Button = ButtonComponent as typeof ButtonComponent & {
  EndIcon: typeof UgButton.EndIcon;
  StartIcon: typeof UgButton.StartIcon;
};

Button.StartIcon = UgButton.StartIcon;
Button.EndIcon = UgButton.EndIcon;