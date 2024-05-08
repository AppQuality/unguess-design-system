import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { Spinner } from "@zendeskgarden/react-loaders";
import { ReactComponent as PlayIcon } from "../../../../assets/icons/play-fill.svg";
import { SpecialCard } from "../../../special-cards";
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';


const VideoCard = styled(SpecialCard)`
  padding: 0;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.grey[800]};
    opacity: 0.3;
    z-index: 1;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`;

const Preview = styled.div`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;

  > video {
    width: 100%;
    height: 100%;
  }
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

const VideoThumbnail = ({
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
    <VideoCard className="singleThumbnail" onClick={clickThumbnail}>
       <Preview>
        <video
          src={src}
        >
          <track kind="captions" />
        </video>
      </Preview>
      <VideoPlayIcon />
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
    </VideoCard>
  );
};

export default VideoThumbnail;
