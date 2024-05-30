import Thumbnail from "./Thumbnail";
import { useChatContext } from "../../context/chatContext";
import { useMemo } from "react";
import { styled } from "styled-components";
import { isError } from "util";

const FlexContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  flex-wrap: wrap;
`;

export interface FileElement {
  fileName: string;
  fileType: string;
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl: string;
  internal_id: string;
  isLoadingMedia: boolean;
}

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
      isError: file.isError,
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
          isError={file.isError}
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
