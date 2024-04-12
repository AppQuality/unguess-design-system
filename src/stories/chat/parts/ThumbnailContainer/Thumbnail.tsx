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
}

const Thumbnail = ({ src, label }: Props) => {
  const handleCancel = () => {
    console.log("cancel: ", src);
    const thumbnailContainer = document.querySelector(".thumbnailContainer")!;
    const thumbnailToDelete = thumbnailContainer.querySelector(
      `img[src="${src}"]`
    )!.parentElement!;
    thumbnailContainer.removeChild(thumbnailToDelete);
    if (thumbnailContainer.childElementCount === 0) {
      thumbnailContainer.remove();
    }
  };
  return (
    <StyledThumbnail className="singleThumbnail">
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
