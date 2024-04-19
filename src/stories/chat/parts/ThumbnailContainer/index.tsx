import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useEffect, useState } from "react";

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
  openLightbox: (file: File, index: number) => void;
}

const ThumbnailContainer = ({ imagefiles, openLightbox }: Props) => {
  const [thumbnails, setThumbnails] = useState<File[]>(imagefiles);

  /*const openLightbox = (file: File, index: number) => {
    if (!file) throw Error("Error with the image");
    setSelectedImage(file);
    setSelectedImageIndex(index);
    setIsOpenLightbox(true);

    console.log("lightbox opened", file, selectedImageIndex);
  };

  const closeLightbox = () => {
    setIsOpenLightbox(false);
  };*/
  const deleteThumbnail = (index: number) => {
    console.log("delete imageFiles", imagefiles);

    setThumbnails([
      ...thumbnails.slice(0, index),
      ...thumbnails.slice(index + 1),
    ]);
  };

  useEffect(() => {
    // todo: upload to s3
    setThumbnails(imagefiles);
    console.log("useEffect imageFiles", imagefiles);
  }, [imagefiles, openLightbox]);

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
            showLabel={true}
            removeThumbnail={deleteThumbnail}
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
