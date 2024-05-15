import { useVideoContext } from "@appquality/stream-player";
import { useEffect, useState } from "react";
import { ReactComponent as MutedIcon } from "../../../assets/icons/volume-muted-fill.svg";
import { ReactComponent as UnMutedIcon } from "../../../assets/icons/volume-unmuted-fill.svg";
import { ControlButton } from "./controlButton";

interface VideowithAudio extends HTMLVideoElement {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: any[];
}

export const AudioButton = () => {
  const [hasAudio, setHasAudio] = useState<boolean>(false);
  const { isMuted, setMuted, context } = useVideoContext();

  const { player } = context;

  const checkAudio = (video: VideowithAudio | null) => {
    if (!video) {
      return false;
    }
    
    const videohasAudio =
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length);

    setHasAudio(videohasAudio);
  };

  const hasVolume = (video: HTMLVideoElement | null) => {
    if (!video) {
      return false;
    }
    return video.volume > 0;
  };

  useEffect(() => {
    if (player && player?.ref) {
      setMuted(!hasVolume(player.ref.current));
      checkAudio(player.ref.current);
    }
  }, [context.isPlaying, isMuted, player, setMuted]);

  return (
    <ControlButton
      disabled={!hasAudio}
      onClick={() => {
        if (player?.ref.current) {
          player.ref.current.volume = player.ref.current.volume > 0 ? 0 : 1;
          setMuted(!player.ref.current.volume);
        }
      }}
    >
      {isMuted || !hasAudio ? <MutedIcon /> : <UnMutedIcon />}
    </ControlButton>
  );
};
