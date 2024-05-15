import { useVideoContext } from "@appquality/stream-player";
import { useCallback, useEffect } from "react";
import { ReactComponent as FullScreenEnter } from "../assets/maximize-stroke.svg";
import { ReactComponent as FullScreenExit } from "../assets/minimize-stroke.svg";
import { ControlButton } from "./controlButton";

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
  }, [ref, isFullScreen, setFullScreen]);

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

  useEffect(() => {
    if (ref) {
      ref.addEventListener("fullscreenchange", () => {
        setFullScreen(!!document.fullscreenElement);
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener("fullscreenchange", () => {
          setFullScreen(!!document.fullscreenElement);
        });
      }
    };
  }, [ref]);

  return (
    <ControlButton
      onClick={(e) => {
        handleFullScreen();
        e.stopPropagation();
      }}
      disabled={!canGoFullScreen()}
    >
      {document.fullscreenElement || isFullScreen ? (
        <FullScreenExit />
      ) : (
        <FullScreenEnter />
      )}
    </ControlButton>
  );
};
