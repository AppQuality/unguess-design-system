import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as MutedIcon } from "../../../assets/icons/volume-muted-fill.svg";
import { ReactComponent as UnMutedIcon } from "../../../assets/icons/volume-unmuted-fill.svg";
import { useEffect, useState } from "react";

interface VideowithAudio extends HTMLVideoElement {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: any[];
}

export const AudioButton = (props: { videoRef: VideowithAudio | null }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const { videoRef } = props;

  const hasAudio = (video: VideowithAudio) => {
    if (!video) {
      return false;
    }
    const videohasAudio =
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length);

    return videohasAudio;
  };

  useEffect(() => {
    if (videoRef) {
      setIsMuted(!hasAudio(videoRef) || videoRef.muted);
    }
  }, [videoRef]);

  return (
    <IconButton
      isBright
      disabled={!videoRef || !hasAudio(videoRef)}
      onClick={(e) => {
        if (videoRef) {
          videoRef.muted = !videoRef.muted;
          setIsMuted(videoRef.muted);
        }
        e.stopPropagation();
      }}
    >
      {isMuted ? <MutedIcon /> : <UnMutedIcon />}
    </IconButton>
  );
};
