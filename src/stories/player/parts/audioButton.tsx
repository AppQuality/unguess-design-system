import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as MutedIcon } from "../../../assets/icons/volume-muted-fill.svg";
import { ReactComponent as UnMutedIcon } from "../../../assets/icons/volume-unmuted-fill.svg";
import { useEffect, useState } from "react";

interface VideowithAudio extends HTMLVideoElement {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: any[];
}

export const AudioButton = (props: { videoRef: HTMLVideoElement | null }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasAudio, setHasAudio] = useState<boolean>(false);

  const { videoRef } = props;

  const checkAudio = (video: VideowithAudio | null) => {
    if (!video) {
      return false;
    }
    const videohasAudio =
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length);

    return videohasAudio;
  };

  const hasVolume = (video: HTMLVideoElement | null) => {
    if (!video) {
      return false;
    }
    return video.volume > 0;
  };

  const handleAudio = () => {
    setHasAudio(checkAudio(videoRef));
  };

  useEffect(() => {
    if (videoRef) {
      setIsMuted(!hasVolume(videoRef));

      videoRef.addEventListener("loadeddata", handleAudio);
    }

    return () => {
      if (videoRef) {
        videoRef.removeEventListener("loadeddata", handleAudio);
      }
    };
  }, [videoRef]);

  return (
    <IconButton
      isBright
      disabled={!checkAudio(videoRef || null)}
      onClick={() => {
        if (videoRef) {
          videoRef.volume = videoRef.volume > 0 ? 0 : 1;
          setIsMuted(!videoRef.volume);
        }
      }}
    >
      {isMuted || !hasAudio ? <MutedIcon /> : <UnMutedIcon />}
    </IconButton>
  );
};
