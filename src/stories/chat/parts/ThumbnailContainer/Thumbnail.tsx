import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";

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
  index?: number;
  removeThumbnail?: (index: number) => void;
  clickThumbnail: () => void;
  showX?: boolean;
  showLabel?: boolean;
  mediaType: string;
}

const Thumbnail = ({
  clickThumbnail,
  src,
  label,
  index = 0,
  removeThumbnail,
  showX = true,
  showLabel = true,
  mediaType,
}: Props) => {
  const handleCancel = (e: any) => {
    e.stopPropagation();
    console.log("cancel: ", src);
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
      {mediaType.includes("image") && <img src={src} alt={label} />}
      {mediaType.includes("video") && (
        <video width="100" height="100">
          <source src={src} type="video/mp4" />
        </video>
      )}
      {showLabel && <span className="thumbnailLabel">{label}</span>}
    </StyledThumbnail>
  );
};

export default Thumbnail;
