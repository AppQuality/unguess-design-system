import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as FullScreenIcon } from "../../../assets/icons/maximize-fill.svg";
import { useCallback } from "react";

interface VideowithFullscreen extends HTMLVideoElement {
  webkitEnterFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export const FullScreenButton = (props: {
  videoRef: VideowithFullscreen | null;
}) => {
  const { videoRef } = props;
  const {
    requestFullscreen,
    webkitRequestFullscreen,
    mozRequestFullScreen,
    webkitEnterFullscreen,
    msRequestFullscreen,
  } = videoRef || {};

  const handleFullScreen = useCallback(async () => {
    if (props.videoRef) {
      if (props.videoRef.requestFullscreen) {
        await props.videoRef.requestFullscreen();
      } else if (props.videoRef.webkitRequestFullscreen) {
        await props.videoRef.webkitRequestFullscreen();
      } else if (props.videoRef.mozRequestFullScreen) {
        await props.videoRef.mozRequestFullScreen();
      } else if (props.videoRef.webkitEnterFullscreen) {
        // iOS
        await props.videoRef.webkitEnterFullscreen();
      } else if (props.videoRef.msRequestFullscreen) {
        await props.videoRef.msRequestFullscreen();
      }
    }
  }, [props.videoRef]);

  return (
    <IconButton
      isBright
      onClick={(e) => {
        handleFullScreen();
        e.stopPropagation();
      }}
      disabled={
        !requestFullscreen &&
        !webkitRequestFullscreen &&
        !mozRequestFullScreen &&
        !webkitEnterFullscreen &&
        !msRequestFullscreen
      }
    >
      <FullScreenIcon />
    </IconButton>
  );
};
