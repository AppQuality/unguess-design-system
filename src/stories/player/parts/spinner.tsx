import styled from "styled-components";
import { Spinner } from "../../loaders/spinner";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  height: 100%;
`;

export const VideoSpinner = () => (
  <StyledDiv>
    <Spinner size="50" color="white"/>
  </StyledDiv>
);
