import { styled } from "styled-components";
import { Button } from "../buttons/button";

const CreateObservationButton = styled(Button) <{
  position: { x: number; y: number };
}>`
  user-select: none;
  position: absolute;
  left: ${({ position: { x } }) => x}px;
  top: ${({ position: { y } }) => y}px;
  transform: translate(-50%, 0);
  z-index: ${({ theme }) => theme.levels.front};
`;

export { CreateObservationButton };