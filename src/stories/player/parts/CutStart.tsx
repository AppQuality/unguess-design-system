import { styled } from "styled-components";

const Pin = styled.div<{ left: number }>`
  width: 2px;
  bottom: 0;
  left: ${({ left }) => `${left}%`};
  position: absolute;
  height: 250%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.grey[600]};
  margin-left: -2px; // To not override the current time marker

  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, 0);
    background-color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const CutStart = ({ left }: { left: number; }) => {
  return <Pin id="obs-start-pin" left={left} />;
};

export { CutStart };