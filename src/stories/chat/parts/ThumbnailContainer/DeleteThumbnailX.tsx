import styled from "styled-components";

const StyledDeleteThumbnailX = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  cursor: pointer;
  font-size: 15px;
  background-color: gray;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

interface Props {
  content: string;
  deleteThumbnail: (e: any) => void;
}

const DeleteThumbnailX = ({ content, deleteThumbnail }: Props) => {
  return (
    <StyledDeleteThumbnailX
      className="deleteThumbnail"
      onClick={(e) => deleteThumbnail(e)}
    >
      <span>{content}</span>
    </StyledDeleteThumbnailX>
  );
};

export default DeleteThumbnailX;
