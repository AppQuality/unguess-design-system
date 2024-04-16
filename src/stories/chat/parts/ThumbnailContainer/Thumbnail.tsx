import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { useState } from "react";
import { Lightbox } from "../../../lightbox";

const StyledThumbnail = styled.div`
  border-radius: 10px;
  height: 120px;
  width: 120px;
  justify-content: center;
  padding: 5px 5px 15px 5px;
  position: relative;
  cursor: pointer;
  background-color: rgb(209, 207, 207);
  img {
    width: 100%;
    height: 100%;
    border-radius: 10%;
  }
  .thumbnailLabel {
    position: absolute;
    bottom: 1px;
    left: 5px;
    color: black;
    font-size: 10px;
    font-weight: 100;
  }
`;

interface Props {
  src: string;
  label: string;
  index: number;
  removeThumbnail: (index: number) => void;
  clickThumbnail: () => void;
}

const Thumbnail = ({
  clickThumbnail,
  src,
  label,
  index,
  removeThumbnail,
}: Props) => {
  const handleCancel = () => {
    console.log("cancel: ", src);
    removeThumbnail(index);
  };

  return (
    <StyledThumbnail className="singleThumbnail" onClick={clickThumbnail}>
      <DeleteThumbnailX
        content={"╳"}
        deleteThumbnail={handleCancel}
      ></DeleteThumbnailX>
      <img src={src} />
      <span className="thumbnailLabel">{label}</span>
    </StyledThumbnail>
  );
};

export default Thumbnail;
