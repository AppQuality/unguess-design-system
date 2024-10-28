import { useVideoContext } from "@appquality/stream-player";
import { useEffect } from "react";

type KeyboardCommandsHook = (
) => void;

export const useKeyboardCommands: KeyboardCommandsHook = () => {
  const { context, togglePlay, setCurrentTime, setMuted, isMuted } = useVideoContext();
  const videoRef = context.player?.ref.current;

  useEffect(() => {

    function handleKeyDown(e: KeyboardEvent) {
      console.log(e.code, videoRef);
      if (e.code === "Space") {
        togglePlay();
      }
      if (!videoRef) return;
      if (e.code === "ArrowLeft") {
        setCurrentTime(videoRef.currentTime - 10);
      }
      if (e.code === "ArrowRight") {
        setCurrentTime(videoRef.currentTime + 10);
      }
      if (e.code === "KeyM") {
        videoRef.volume = videoRef.volume > 0 ? 0 : 1;
        setMuted(!videoRef.volume);
      }
    }
    document.addEventListener("keyup", handleKeyDown);
  }, []);
}