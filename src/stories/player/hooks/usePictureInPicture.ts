import { useEffect } from "react";
import { PlayerArgs } from "../_types";

type PictureInPictureHook = (
  videoRef?: HTMLVideoElement | null,
  pipMode?: PlayerArgs["pipMode"],
  onPipChange?: PlayerArgs["onPipChange"]
) => void;

export const usePictureInPicture: PictureInPictureHook = (videoRef, pipMode, onPipChange) => {

  const getObserver = (videoRef: HTMLVideoElement, isVideoPlaying: () => boolean) => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isVideoPlaying()) {
            videoRef.requestPictureInPicture();
          }
          if (
            document.pictureInPictureElement &&
            entry.isIntersecting &&
            !isVideoPlaying()
          ) {
            document.exitPictureInPicture();
          }
        });
      },
      { threshold: 0.5 }
    );
  };

  const handleManualPipMode = (videoRef: HTMLVideoElement, pipMode: boolean) => {
    if (pipMode) {
      videoRef.requestPictureInPicture();
    }
    if (!pipMode && document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }
  }

  useEffect(() => {
    // bail out if pipMode is not defined or videoRef is not defined or pip is not supported
    if (typeof pipMode === "undefined")
      return;
    if (!document.pictureInPictureEnabled) {
      console.warn("Picture-in-Picture is not supported in this browser");
      return;
    }
    if (!videoRef)
      return;

    // if pipMode is auto, we will enter picture in picture mode when the video is not in view
    if (pipMode === "auto") {
      const isVideoPlaying = () =>
        videoRef.currentTime > 0 &&
        !videoRef.paused &&
        !videoRef.ended &&
        videoRef.readyState > 2;

      const observer = getObserver(videoRef, isVideoPlaying);
      observer.observe(videoRef);

      return () => {
        observer.disconnect();
      };
    } else if (typeof pipMode === "boolean") {
      handleManualPipMode(videoRef, pipMode);
    } else {
      handleManualPipMode(videoRef, pipMode());
    }
  }, [pipMode, videoRef]);

  useEffect(() => {
    if (!document.pictureInPictureEnabled) {
      return;
    }
    document.addEventListener("enterpictureinpicture", () => {
      onPipChange?.(true);
    });
    document.addEventListener("leavepictureinpicture", () => {
      onPipChange?.(false);
    });

    return () => {
      document.removeEventListener("enterpictureinpicture", () => {
        onPipChange?.(true);
      });
      document.removeEventListener("leavepictureinpicture", () => {
        onPipChange?.(false);
      });
    };
  }, [onPipChange]);
}