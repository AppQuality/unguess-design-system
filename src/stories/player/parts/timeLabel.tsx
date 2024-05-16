import styled from "styled-components";
import { SM } from "../../typography/typescale";
import { formatDuration } from "./utils";

const StyledDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const TimeLabel = ({
  current,
  duration,
}: {
  current: number;
  duration: number;
}) => (
  <StyledDiv>
    <SM tag="span">
      {formatDuration(current)}/{formatDuration(duration)}
    </SM>
  </StyledDiv>
);
