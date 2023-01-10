import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as ChevronLeft } from "../../../assets/icons/chevron-left-stroke.svg";
import { ReactComponent as ChevronRight } from "../../../assets/icons/chevron-right-stroke.svg";
import { IconButtonArgs } from "../../buttons/icon-button/_types";
import styled from "styled-components";

const NavButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
`;

export const PrevButton = (props: IconButtonArgs) => (
  <NavButton {...props} style={{ left: "-25px" }}>
    <ChevronLeft />
  </NavButton>
);

export const NextButton = (props: IconButtonArgs) => (
  <NavButton {...props} style={{ right: "-25px" }}>
    <ChevronRight />
  </NavButton>
);
