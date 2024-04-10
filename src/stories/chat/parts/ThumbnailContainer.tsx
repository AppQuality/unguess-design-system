import { styled } from "styled-components";

const StyledThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  overflow-y: scroll;
  justify-items: center;
  gap: 10px;
  background-color: white;
  width: 100%;
  height: 150px;
`;

const ThumbnailContainer = () => {
  return <StyledThumbnailContainer>pippo</StyledThumbnailContainer>;
};
export default ThumbnailContainer;
