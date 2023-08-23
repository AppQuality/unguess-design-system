import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as FullScreenEnter } from "../assets/maximize-stroke.svg";
import { ReactComponent as FullScreenExit } from "../assets/minimize-stroke.svg";
import { useCallback, useEffect } from "react";
import { useVideoContext } from "@appquality/stream-player";

interface ElementWithFullscreen extends HTMLDivElement {
  webkitEnterFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export const FullScreenButton = ({
  container,
}: {
  container: HTMLDivElement | null;
}) => {
  const { setFullScreen, isFullScreen } = useVideoContext();

  const ref = container as ElementWithFullscreen | null;
  const {
    requestFullscreen,
    webkitRequestFullscreen,
    mozRequestFullScreen,
    webkitEnterFullscreen,
    msRequestFullscreen,
  } = ref || {};

  const handleFullScreen = useCallback(async () => {
    if (ref) {
      if (!isFullScreen || !document.fullscreenElement) {
        setFullScreen(true);
        if (ref.requestFullscreen) {
          await ref.requestFullscreen();
        } else if (ref.webkitRequestFullscreen) {
          await ref.webkitRequestFullscreen();
        } else if (ref.mozRequestFullScreen) {
          await ref.mozRequestFullScreen();
        } else if (ref.webkitEnterFullscreen) {
          // iOS
          await ref.webkitEnterFullscreen();
        } else if (ref.msRequestFullscreen) {
          await ref.msRequestFullscreen();
        } else {
          console.error("Fullscreen API is not supported");
          setFullScreen(false);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setFullScreen(false);
      }
    }
  }, [ref, isFullScreen]);

  const canGoFullScreen = useCallback(async () => {
    if (ref) {
      return (
        requestFullscreen ||
        webkitRequestFullscreen ||
        mozRequestFullScreen ||
        webkitEnterFullscreen ||
        msRequestFullscreen
      );
    }

    return false;
  }, [ref]);

  return (
    <IconButton
      isBright
      onClick={(e) => {
        handleFullScreen();
        e.stopPropagation();
      }}
      disabled={!canGoFullScreen()}
    >
      {document.fullscreenElement || isFullScreen ? <FullScreenExit /> : <FullScreenEnter />}
    </IconButton>
  );
};
