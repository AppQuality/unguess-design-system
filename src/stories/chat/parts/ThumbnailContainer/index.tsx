import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useEffect, useState } from "react";
import { Lightbox } from "../../../lightbox";

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

interface Props {
  imagefiles: File[];
  openLightbox: (isOpen: boolean) => void;
}

const ThumbnailContainer = ({imagefiles, openLightbox}: Props) => {

  const handleCancel = () => {
    console.log("cancel");
  }

  useEffect(() => {
    // todo: upload to s3
    console.log(imagefiles);
  }, [imagefiles]);

  return <>
    <StyledThumbnailContainer>
      {imagefiles.map((file, index) => {
        return <div onClick={() => openLightbox(true)}>
          <Thumbnail key={index} src={URL.createObjectURL(file)} onCancel={handleCancel} />
          </div>
      })}
    </StyledThumbnailContainer>
  </>;
};

export default ThumbnailContainer;