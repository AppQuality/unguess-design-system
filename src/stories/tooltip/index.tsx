import { Tooltip as ZendeskTooltip } from "@zendeskgarden/react-tooltips";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { theme as globalTheme } from "../theme";
import { TooltipArgs } from "./_types";

/**
 * Tooltips appear when a user hovers or focuses an element. They provide contextual information about the element they are paired with.
 * <hr>
 * Used for this:
 *    - To describe the function of an element when it might be ambiguous
 *    - To describe the function of unlabeled icons
 * Not for this:
 *    - To provide information a user needs to know or remember
 *    - To display truncated text, use a title attribute instead
 */
const TooltipComponent = (props: TooltipArgs) => {
  const theme = useContext(ThemeContext as React.Context<typeof globalTheme>);

  return (
    <ZendeskTooltip {...props} zIndex={props.zIndex ?? theme.levels.front} />
  );
};

const StyledTooltip = styled(TooltipComponent)`
  box-shadow: ${({ theme }) => theme.shadows.lg()};

  ${({ maxWidth }) =>
    maxWidth &&
    `max-width: ${maxWidth === "unset" ? "unset" : `${maxWidth}px`};`}
  ${({ isTransparent }) =>
    isTransparent &&
    `
      box-shadow: none;
      background-color: transparent;
      border: none;
    `};
`;

const Tooltip = (props: TooltipArgs) => <StyledTooltip {...props} />;

export { Tooltip };
