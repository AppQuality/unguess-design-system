import styled from "styled-components";
import { SM } from "../../typography/typescale";

const StyledDiv = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space.sm};
  right: 0;

  padding: 0 ${({ theme }) => theme.space.xs};

  span {
    color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

export const TimeLabel = ({
  current,
  duration,
}: {
  current: string;
  duration: string;
}) => (
  <StyledDiv>
    <SM tag="span">
      {current}/{duration}
    </SM>
  </StyledDiv>
);
