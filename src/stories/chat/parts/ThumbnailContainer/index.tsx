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

export interface FileElement {
  fileName: string;
  fileType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl: string;
}

interface Props {
  openLightbox: (file: File, index: number) => void;
}

const ThumbnailContainer = ({ openLightbox }: Props) => {
  const { thumbnails, removeThumbnail } = useChatContext();

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  /* const mediaFiles: File[] = thumbnails.map((file) => {
    // Crea un nuovo oggetto File senza la proprietà isLoadingMedia
    const blob = new Blob([file], { type: file.type });

    // Creiamo un nuovo File utilizzando il Blob e mantenendo il nome del file originale
    const nf = new File([blob], file.name, { type: file.type });

    return nf;
  });*/

  const mediaFiles: FileElement[] = [];
  thumbnails.forEach((file) => {
    mediaFiles.push({
      fileName: file.name,
      fileType: file.type,
      status: file.isLoadingMedia ? "uploading" : "success",
      previewUrl: URL.createObjectURL(file),
    });
  });

  console.log("mediafiles", mediaFiles);

  return (
    <>
      <StyledThumbnailContainer className="thumbnailContainer">
        {mediaFiles.map((file, index) => (
          <Thumbnail
            key={index}
            src={file.previewUrl}
            label={file.fileName}
            index={index}
            showX={true}
            showLabel={false}
            mediaType={file.fileType}
            isLoadingMedia={file.status === "uploading"}
            removeThumbnail={() => removeThumbnail(index)}
            clickThumbnail={() => {
              openLightbox(thumbnails[index], index);
            }}
          />
        ))}
      </StyledThumbnailContainer>
    </>
  );
};

export default ThumbnailContainer;
