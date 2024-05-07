import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { Spinner } from "@zendeskgarden/react-loaders";
import { useChatContext } from "../../context/chatContext";
import { ReactComponent as PlayIcon } from "../../../../assets/icons/play-fill.svg";
import { useState } from "react";

const StyledThumbnail = styled.div`
  border-radius: 4%;
  height: 90px;
  width: 80px;
  justify-content: center;
  padding: 1px;
  position: relative;
  cursor: pointer;
  background-color: rgb(209, 207, 207);
  img {
    width: 100%;
    height: 100%;
    border-radius: 4%;
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
  index?: number;
  removeThumbnail?: (index: number) => void;
  clickThumbnail: () => void;
  showX?: boolean;
  showLabel?: boolean;
  mediaType: string;
  isLoadingMedia: boolean;
}

const Thumbnail = ({
  clickThumbnail,
  src,
  label,
  index = 0,
  removeThumbnail,
  showX = true,
  showLabel = false,
  mediaType,
  isLoadingMedia = false,
}: Props) => {
  //const { isMediaUploading, setIsMediaUploading } = useChatContext();

  const handleCancel = (e: any) => {
    e.stopPropagation();
    if (removeThumbnail) removeThumbnail(index);
  };

  return (
    <StyledThumbnail className="singleThumbnail" onClick={clickThumbnail}>
      {showX && (
        <DeleteThumbnailX
          content={"╳"}
          deleteThumbnail={(e) => handleCancel(e)}
        ></DeleteThumbnailX>
      )}
      {isLoadingMedia && (
        <Spinner
          style={{ position: "absolute", top: "39%", left: "37%" }}
          size="large"
        />
      )}
      {!isLoadingMedia && mediaType.includes("image") && (
        <img src={src} alt={label} />
      )}
      {!isLoadingMedia && mediaType.includes("video") && (
        <span
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "gray",
            zIndex: "-1",
            opacity: "0.5",
            color: "black",
          }}
        >
          <PlayIcon
            style={{
              position: "absolute",
              top: "35%",
              left: "35%",
              width: "30px",
              height: "30px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
          <video width="80" height="89">
            <source src={src} type="video/mp4" />
          </video>
        </span>
      )}
      {showLabel && <span className="thumbnailLabel">{label}</span>}
    </StyledThumbnail>
  );
};

export default Thumbnail;
