import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { Spinner } from "@zendeskgarden/react-loaders";
import { SpecialCard } from "../../../special-cards";

const ImageCard = styled(SpecialCard)`
  padding: 0;
  :hover .deleteThumbnail {
    opacity: 1;
  }
`;

const Preview = styled.div<{
  url: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
  background-image: url(${(props) => props.url});
  background-color: ${({ theme }) => theme.palette.grey[100]};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;


interface Props {
  src: string;
  index?: number;
  removeThumbnail?: (index: number) => void;
  clickThumbnail: () => void;
  showX?: boolean;
  isLoadingMedia: boolean;
  isError?: boolean;
}

const ImageThumbnail = ({
  src,
  index = 0,
  removeThumbnail,
  clickThumbnail,
  showX = true,
  isLoadingMedia = false,
  isError = false,
}: Props) => {

  const handleCancel = (e: any) => {
    e.stopPropagation();
    if (removeThumbnail) removeThumbnail(index);
  };

  return (

    <ImageCard onClick={clickThumbnail}>
      <Preview url={src}>
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
        {isError && (
          // todo: add error icon
          <span>error uploading media</span>
        )}
      </Preview>
    </ImageCard>

  );
};

export default ImageThumbnail;
