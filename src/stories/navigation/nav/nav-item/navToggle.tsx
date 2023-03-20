import { IconButton } from "../../../buttons/icon-button";
import { ReactComponent as ChevronRightIcon } from "../../../../assets/icons/chevron-right-stroke.svg";
import { ReactComponent as ChevronLeftIcon } from "../../../../assets/icons/chevron-left-stroke.svg";
import { NavToggleArgs } from "./_types";
import styled from "styled-components";

const StyledToggle = styled(IconButton)`
  display: none;
  width: ${({ theme }) => theme.space.base * 6}px;
  height: ${({ theme }) => theme.space.base * 6}px;
  min-width: ${({ theme }) => theme.space.md};
  position: absolute;
  top: ${({ theme }) => theme.space.base * 3}px;
  right: -${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.gradients.dark}};
  z-index: 3;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const NavToggle = (props: NavToggleArgs) => {
  return (
    <StyledToggle {...props} className="toggle-navigation" isPrimary size={"small"}>
      {props.isExpanded ? (
        <ChevronLeftIcon style={{ width: "100%" }} />
      ) : (
        <ChevronRightIcon style={{ width: "100%" }} />
      )}
    </StyledToggle>
  );
};

export { NavToggle };
