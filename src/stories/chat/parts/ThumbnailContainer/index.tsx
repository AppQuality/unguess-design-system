import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useCallback, useEffect, useState } from "react";

const StyledThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  overflow-y: scroll;
  justify-items: center;
  gap: 10px;
  background-color: white;
  width: 100%;
  height: 150px;
  .singleThumbnail:hover .deleteThumbnail {
    opacity: 1 !important;
  }
`;

interface Props {
  imagefiles: File[];
  openLightbox: (isOpen: boolean) => void;
}

const ThumbnailContainer = ({ imagefiles, openLightbox }: Props) => {
  const [thumbnails, setThumbnails] = useState<File[]>(imagefiles);
  const deleteThumbnail = (index: number) => {
    console.log("delete imageFiles", imagefiles);
    setThumbnails([...thumbnails.toSpliced(index, 1)]);
  };

  useEffect(() => {
    // todo: upload to s3
    setThumbnails(imagefiles);
    console.log("useEffect imageFiles", imagefiles);
  }, [imagefiles]);

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  return (
    <StyledThumbnailContainer className="thumbnailContainer">
      {thumbnails.map((file, index) => {
        return (
          <Thumbnail
            index={index}
            removeThumbnail={deleteThumbnail}
            onClick={() => openLightbox(true)}
            key={index}
            src={URL.createObjectURL(file)}
            label={file.name}
          ></Thumbnail>
        );
      })}
    </StyledThumbnailContainer>
  );
};

export default ThumbnailContainer;
