import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DeleteThumbnailX from "./DeleteThumbnailX";

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
  //openLightbox: (isOpen: boolean) => void;
}

const ThumbnailContainer = ({ imagefiles /*openLightbox*/ }: Props) => {
  useEffect(() => {
    // todo: upload to s3
    console.log(imagefiles);
  }, [imagefiles]);

  if (!imagefiles || imagefiles.length === 0) {
    return null;
  }

  return (
    <>
      <StyledThumbnailContainer className="thumbnailContainer">
        {imagefiles.map((file, index) => {
          return (
            // <div onClick={() => openLightbox(true)}>
            <Thumbnail
              key={index}
              src={URL.createObjectURL(file)}
              label={file.name}
            ></Thumbnail>
            //  </div>
          );
        })}
      </StyledThumbnailContainer>
    </>
  );
};

export default ThumbnailContainer;
