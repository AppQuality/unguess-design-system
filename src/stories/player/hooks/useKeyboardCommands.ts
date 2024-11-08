import { useEffect } from "react";

type KeyboardCommandsHook = ({
  setIsPlaying,
  onCutHandler,
  videoRef,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
  onCutHandler?: (time: number) => void;
  onShortcut?: (type: string) => void;
  videoRef?: HTMLVideoElement | null;
}) => void;

export const useKeyboardCommands: KeyboardCommandsHook = ({
  setIsPlaying,
  onCutHandler,
  onShortcut,
  videoRef,
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // console.log("handleKeyDown", e.code, document.activeElement, e.target);
      if (document.activeElement?.tagName === "INPUT") return;
      if (document.activeElement?.tagName === "TEXTAREA") return;

      if (!videoRef) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (videoRef.paused) {
          setIsPlaying(true);
          videoRef.play();
          onShortcut?.("play");
        } else {
          setIsPlaying(false);
          videoRef.pause();
          onShortcut?.("pause");
        }
      }
      if (e.code === "ArrowLeft") {
        videoRef.currentTime -= 10;
        onShortcut?.("rewind");
      }
      if (e.code === "ArrowRight") {
        videoRef.currentTime += 10;
        onShortcut?.("fast-forward");
      }
      if (e.code === "KeyM") {
        videoRef.muted = !videoRef.muted;
        videoRef.volume = videoRef.muted ? 0 : 1;
        onShortcut?.("mute");
      }
      if (e.code === "KeyS") {
        onCutHandler?.(videoRef.currentTime);
        e.stopPropagation();
        onShortcut?.("start/stop_observation");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoRef, onCutHandler]);
};
