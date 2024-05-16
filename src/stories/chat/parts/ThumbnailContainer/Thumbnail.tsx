import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { Spinner } from "@zendeskgarden/react-loaders";
import { SpecialCard } from "../../../special-cards";
import { ReactComponent as VideoPlayIcon } from "../../../../assets/icons/video-play-icon.svg";

const ImageCard = styled(SpecialCard)`
  padding: 0;
  position: relative;
  overflow: hidden;
  min-width: 90px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.grey[800]};
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1;
  }

  &:hover {
    .deleteThumbnail {
      opacity: 1;
    }
    &:before {
      opacity: 0.3;
    }
  }

  &.video {
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      z-index: 2;
    }
  }
`;

const Preview = styled.div<{
  url?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;

  ${(p) =>
    p.url &&
    `
    background-image: url(${p.url});
    background-color: ${p.theme.palette.grey[100]};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}

  > video {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  src?: string;
  type: string;
  clickThumbnail?: () => void;
  isLoadingMedia?: boolean;
  removeThumbnail?: () => void;
  showX?: boolean;
  isError?: boolean;
}

const Thumbnail = ({
  src,
  type,
  removeThumbnail,
  clickThumbnail,
  showX,
  isLoadingMedia = true,
  isError = false,
}: Props) => {
  const handleCancel = (e: any) => {
    e.stopPropagation();
    if (removeThumbnail) removeThumbnail();
  };

  return (
    <ImageCard
      onClick={clickThumbnail}
      className={type.includes("video") ? "video" : "image"}
    >
      {isError && (
        // todo: add error icon
        <span>error uploading media</span>
      )}
      {isLoadingMedia ? (
        <Preview>
          <Spinner
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            size="large"
          />
        </Preview>
      ) : (
        <Preview url={src}>
          {showX && (
            <DeleteThumbnailX deleteThumbnail={(e) => handleCancel(e)} />
          )}
          {type.includes("video") && (
            <>
              <video src={src}>
                <track kind="captions" />
              </video>
              <VideoPlayIcon />
            </>
          )}
        </Preview>
      )}
    </ImageCard>
  );
};

export default Thumbnail;
