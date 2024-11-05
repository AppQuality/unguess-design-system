import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

import { useEffect } from "react";

const analytics = Analytics({
  app: 'Unguess',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-2M29YVTK78']
    })
  ]
})

type KeyboardCommandsHook = (
  setIsPlaying: (isPlaying: boolean) => void,
  onCutHandler?: (time: number) => void,
  videoRef?: HTMLVideoElement | null,
) => void;

export const useKeyboardCommands: KeyboardCommandsHook = (setIsPlaying, onCutHandler, videoRef) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // console.log("handleKeyDown", e.code, document.activeElement, e.target);
      if (document.activeElement?.tagName === "INPUT") return;
      if (document.activeElement?.tagName === "TEXTAREA") return;
      
      if (!videoRef) return;
      
      if (e.code === "Space") {
        e.preventDefault();
        analytics.track('Player_Shortcut', {
          action: 'play/pause',
        })

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
        analytics.track('Player_Shortcut', {
          action: 'rewind',
        })
      }
      if (e.code === "ArrowRight") {
        videoRef.currentTime += 10;
        analytics.track('Player_Shortcut', {
          action: 'fast-forward',
        })
      }
      if (e.code === "KeyM") {
        videoRef.muted = !videoRef.muted;
        videoRef.volume = videoRef.muted ? 0 : 1;
        analytics.track('Player_Shortcut', {
          action: 'mute',
        })
      }
      if (e.code === "KeyS") {
        onCutHandler?.(videoRef.currentTime);
        e.stopPropagation();
        analytics.track('Player_Shortcut', {
          action: 'start/stop_observation',
        })
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [videoRef, onCutHandler]);
}