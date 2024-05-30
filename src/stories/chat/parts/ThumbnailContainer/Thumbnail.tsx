import styled from "styled-components";
import DeleteThumbnailX from "./DeleteThumbnailX";
import { Spinner } from "@zendeskgarden/react-loaders";
import { SpecialCard } from "../../../special-cards";
import { ReactComponent as VideoPlayIcon } from "../../../../assets/icons/video-play-icon.svg";

const ImageCard = styled(SpecialCard)<{error?: string, isLoading?: boolean}>`
  padding: 0;
  position: relative;
  overflow: hidden;
  width: 90px;

  &:before {
    content: "";
    font-size: ${({ theme }) => theme.fontSizes.xs};
    position: absolute;
    padding: ${({ theme }) => theme.space.xs};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.grey[800]}00; // 0% opacity
    transition: opacity 0.2s;
  }

  &:hover {
    .deleteThumbnail {
      opacity: 1;
    }
    &:before {
      background-color: ${({ theme }) => theme.palette.grey[800]}4d; // 30% opacity
    }
  }
  ${(p) =>
    p.error &&
    `
    &:before{
      content: "Error: ${p.error}";
      color: ${p.theme.palette.white};
      background-color: ${p.theme.palette.grey[800]}b3; // 0.7 opacity
    }
  `}
  ${(p) =>
    p.isLoading &&
    `
    &:before{
      background-color: ${p.theme.palette.grey[800]}b3; // 0.7 opacity
    }
  `}
  &.video {
    svg {
      color: ${({ theme }) => theme.palette.grey[800]};
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

const Preview = styled.div<{url?: string;}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  color: ${({ theme }) => theme.palette.white};
  
  ${p =>
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
  error?: string;
}

const Thumbnail = ({
  src,
  type,
  removeThumbnail,
  clickThumbnail,
  showX,
  isLoadingMedia,
  error = "",
}: Props) => {
  const handleCancel = (e: any) => {
    e.stopPropagation();
    if (removeThumbnail) removeThumbnail();
  };

  return (
    <ImageCard
      onClick={clickThumbnail}
      className={type.includes("video") ? "video" : "image"}
      error={error}
      isLoading={isLoadingMedia}
    >
      {isLoadingMedia ? (
        <Preview url={src}>
          <Spinner
            style={{
              display: "flex",
              position: "absolute",
              color: "white",
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
              <VideoPlayIcon opacity={error ? "0.3" : "1"} />
            </>
          )}
        </Preview>
      )}
    </ImageCard>
  );
};

export default Thumbnail;
