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
    if (videoRef) {
      if (videoRef.requestFullscreen) {
        await videoRef.requestFullscreen();
      } else if (videoRef.webkitRequestFullscreen) {
        await videoRef.webkitRequestFullscreen();
      } else if (videoRef.mozRequestFullScreen) {
        await videoRef.mozRequestFullScreen();
      } else if (videoRef.webkitEnterFullscreen) {
        // iOS
        await videoRef.webkitEnterFullscreen();
      } else if (videoRef.msRequestFullscreen) {
        await videoRef.msRequestFullscreen();
      }
    }
  }, [videoRef]);

  const canGoFullScreen = useCallback(async () => {
    if (videoRef) {
      return (
        requestFullscreen ||
        webkitRequestFullscreen ||
        mozRequestFullScreen ||
        webkitEnterFullscreen ||
        msRequestFullscreen
      );
    }

    return false;
  }, [videoRef]);

  return (
    <IconButton
      isBright
      onClick={(e) => {
        handleFullScreen();
        e.stopPropagation();
      }}
      disabled={!canGoFullScreen()}
    >
      <FullScreenIcon />
    </IconButton>
  );
};
