import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-left-stroke.svg";
import { Button } from "../buttons/button";
import styled from "styled-components";
import { ButtonArgs } from "../buttons/button/_types";

const StyledButton = styled(Button)`
  color: ${(props) => props.theme.palette.grey[800]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  padding-left: 0;
  justify-content: flex-start;

  ${(props) => `
  &:hover,
  &:focus,
  &:active {
    background-color: ${props.theme.palette.kale[100]};
    color: ${props.isDanger ? props.theme.palette.red[500] : props.theme.palette.grey[800]};
  }`};
`;

export const PreviousButton = (props: ButtonArgs) => (
  <StyledButton {...props} isStretched>
    <StyledButton.StartIcon>
      <ChevronIcon />
    </StyledButton.StartIcon>
    {props.children}
  </StyledButton>
);
