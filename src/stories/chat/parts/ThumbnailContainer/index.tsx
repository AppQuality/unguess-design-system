import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useChatContext } from "../../context/chatContext";

const StyledThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  overflow-y: scroll;
  justify-items: center;
  gap: 9px;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  height: 150px;
  .singleThumbnail:hover .deleteThumbnail {
    opacity: 1 !important;
    z-index: 9999;
  }
`;

interface Props {
  openLightbox: (file: File, index: number) => void;
}

const ThumbnailContainer = ({ openLightbox }: Props) => {
  const { thumbnails, removeThumbnail } = useChatContext();

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  return (
    <>
      <StyledThumbnailContainer className="thumbnailContainer">
        {thumbnails.map((file, index) => (
          <Thumbnail
            key={index}
            src={URL.createObjectURL(file)}
            label={file.name}
            index={index}
            showX={true}
            showLabel={false}
            mediaType={file.type}
            removeThumbnail={() => removeThumbnail(index)}
            clickThumbnail={() => {
              openLightbox(file, index);
            }}
          />
        ))}
      </StyledThumbnailContainer>
    </>
  );
};

export default ThumbnailContainer;
