import Thumbnail from "./Thumbnail";
import { useChatContext } from "../../context/chatContext";
import { useMemo } from "react";
import { styled } from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  flex-wrap: wrap;
`;

interface Props {
  openLightbox: (index: number) => void;
}

const ThumbnailContainer = ({ openLightbox }: Props) => {
  const { thumbnails, removeThumbnail, onDeleteThumbnail } = useChatContext();

  const mediaFiles = useMemo(() => {
    return thumbnails.map((file) => ({
      fileName: file.name,
      fileType: file.type,
      previewUrl: file.url,
      id: file.id,
      isLoadingMedia: file.isLoadingMedia,
      error: file.error,
    }));
  }, [thumbnails]);

  if (!mediaFiles || mediaFiles.length === 0) {
    return null;
  }

  return (
    <FlexContainer>
      {mediaFiles.map((file, index) => (
        <Thumbnail
          key={file.id}
          src={file.previewUrl}
          showX
          type={file.fileType}
          isLoadingMedia={file.isLoadingMedia}
          error={file.error}
          removeThumbnail={() => {
            removeThumbnail(index);
            onDeleteThumbnail(file.id);
          }}
          clickThumbnail={() => {
            openLightbox(index);
          }}
        />
      ))}
    </FlexContainer>
  );
};

export default ThumbnailContainer;
