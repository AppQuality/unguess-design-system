import styled from "styled-components";
import { ReactComponent as DeleteThumbnailIcon } from "../../../../assets/icons/remove-media-icon.svg";

const StyledDeleteThumbnailX = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  cursor: pointer;
  width: 32px;
  height: 32px;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 2;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

interface Props {
  deleteThumbnail: (e: any) => void;
}

const DeleteThumbnailX = ({ deleteThumbnail }: Props) => {
  return (
    <StyledDeleteThumbnailX className="deleteThumbnail">
      <DeleteThumbnailIcon onClick={(e) => deleteThumbnail(e)} />
    </StyledDeleteThumbnailX>
  );
};

export default DeleteThumbnailX;
