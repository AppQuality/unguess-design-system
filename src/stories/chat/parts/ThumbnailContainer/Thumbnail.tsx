import styled from "styled-components";

const StyledThumbnail = styled.span`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

interface Props {
  src: string;
  onCancel: () => void;
}

const Thumbnail = ({ src, onCancel }: Props) => {

  return <StyledThumbnail>
    <img src={src} />
    <span onClick={onCancel}>x</span>
    <span>label</span>
  </StyledThumbnail>;
}

export default Thumbnail;