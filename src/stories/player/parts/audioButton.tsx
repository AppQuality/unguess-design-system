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

  const hasAudio = (video: VideowithAudio) => {
    if (!video) {
      return false;
    }
    const _hasAudio =
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length);

    return _hasAudio;
  };

  useEffect(() => {
    if (props.videoRef) {
      setIsMuted(!hasAudio(props.videoRef) || props.videoRef.muted);
    }
  }, [props.videoRef]);

  return (
    <IconButton
      isBright
      disabled={!props.videoRef || !hasAudio(props.videoRef)}
      onClick={(e) => {
        if (props.videoRef) {
          props.videoRef.muted = !props.videoRef.muted;
          setIsMuted(props.videoRef.muted);
        }
        e.stopPropagation();
      }}
    >
      {isMuted ? <MutedIcon /> : <UnMutedIcon />}
    </IconButton>
  );
};
