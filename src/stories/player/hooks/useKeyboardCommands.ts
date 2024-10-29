import { useVideoContext } from "@appquality/stream-player";
import { useEffect } from "react";

type KeyboardCommandsHook = (
  setIsPlaying: (isPlaying: boolean) => void,
  videoRef?: HTMLVideoElement | null,
) => void;

export const useKeyboardCommands: KeyboardCommandsHook = (setIsPlaying, videoRef) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // console.log("handleKeyDown", e.code, document.activeElement, e.target);
      if (document.activeElement?.tagName === "INPUT") return;
      if (!videoRef) return;
      
      if (e.code === "Space") {
        e.preventDefault();
        if (videoRef.paused) {
          setIsPlaying(true);
          videoRef.play();
        } else {
          setIsPlaying(false);
          videoRef.pause();
        }
      }
      if (e.code === "ArrowLeft") {
        videoRef.currentTime -= 10;
      }
      if (e.code === "ArrowRight") {
        videoRef.currentTime += 10;
      }
      if (e.code === "KeyM") {
        videoRef.muted = !videoRef.muted;
        videoRef.volume = videoRef.muted ? 0 : 1;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [videoRef]);
}