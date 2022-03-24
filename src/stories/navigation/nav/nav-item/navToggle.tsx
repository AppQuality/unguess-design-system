import { IconButton } from "../../../buttons/icon-button";
import { ReactComponent as ChevronRightIcon } from "@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg";
import { ReactComponent as ChevronLeftIcon } from "@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg";
import { NavToggleArgs } from "./_types";
import styled from "styled-components";

const StyledToggle = styled(IconButton)`
  width: ${({ theme }) => theme.space.base * 6}px;
  height: ${({ theme }) => theme.space.base * 6}px;
  min-width: ${({ theme }) => theme.space.md};
  position: absolute;
  top: ${({ theme }) => theme.space.base * 3}px;
  right: -${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.gradients.dark}};
  z-index: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const NavToggle = (props: NavToggleArgs) => {
  return (
    <StyledToggle {...props} isPrimary size={"small"}>
      {props.isExpanded ? (
        <ChevronLeftIcon style={{ width: "100%" }} />
      ) : (
        <ChevronRightIcon style={{ width: "100%" }} />
      )}
    </StyledToggle>
  );
};

export { NavToggle };
