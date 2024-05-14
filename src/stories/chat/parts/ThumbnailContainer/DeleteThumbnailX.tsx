import styled from "styled-components";
import DeleteThumbnailIcon from "../../../../assets/icons/remove-media-icon.svg";

const StyledDeleteThumbnailX = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  cursor: pointer;
  width: 32px;
  height: 32px;
  opacity: 0;
  z-index: 2;
`;

interface Props {
  deleteThumbnail: (e: any) => void;
}

const DeleteThumbnailX = ({ deleteThumbnail }: Props) => {
  return (
    <StyledDeleteThumbnailX className="deleteThumbnail">
      <span onClick={(e) => deleteThumbnail(e)}>
        <DeleteThumbnailIcon />
      </span>
    </StyledDeleteThumbnailX>
  );
};

export default DeleteThumbnailX;
