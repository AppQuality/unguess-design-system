import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as FullScreenIcon } from "../../../assets/icons/maximize-fill.svg";
import { useCallback } from "react";

export const FullScreenButton = (props: {
  videoRef: HTMLVideoElement | null;
}) => {
  const handleFullScreen = useCallback(async () => {
    if (props.videoRef) {
      if (props.videoRef.requestFullscreen) {
        await props.videoRef.requestFullscreen();
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
    >
      <FullScreenIcon />
    </IconButton>
  );
};
