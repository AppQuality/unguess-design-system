import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./parts/container";
import { Controls } from "./parts/controls";
import { FloatingControls } from "./parts/floatingControls";
import { Video } from "./parts/video";
import { PlayerArgs } from "./_types";

/**
 * The Anchor is a link that helps users navigate from one location to another.
 * <hr>
 * Used for this:
    - To navigate from one page to another
    - To navigate within a page
    - To display links alongside text 
 */
const Player = (props: PlayerArgs) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const handleLoad = () => {
    setIsLoaded(true);
    setDuration(videoRef.current?.duration || 0);
  };

  const handlePlayPause = useCallback(() => {
    if (!videoRef || !videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoRef]);

  const handleExternalPlayPause = useCallback(() => {
    if (!videoRef || !videoRef.current) return;
    console.log("External play pause", videoRef.current.paused);
    if (videoRef.current.paused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [videoRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleExternalPlayPause);
      videoRef.current.addEventListener("pause", handleExternalPlayPause);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleExternalPlayPause);
        videoRef.current.removeEventListener("pause", handleExternalPlayPause);
        videoRef.current.removeEventListener(
          "onplaying",
          handleExternalPlayPause
        );
      }
    };
  }, [videoRef.current]);

  return (
    <Container
      isLoaded={isLoaded}
      isPlaying={isPlaying}
      onClick={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        handlePlayPause();
      }}
    >
      {!isLoaded && <>Loading...</>}
      <Video ref={videoRef} onLoadedData={handleLoad} preload="auto">
        {props.children}
      </Video>
      <FloatingControls isPlaying={isPlaying} />
      <Controls
        videoRef={videoRef.current}
        duration={duration}
        isPlaying={isPlaying}
        onPlayChange={(isPlaying) => setIsPlaying(isPlaying)}
      />
    </Container>
  );
};

export { Player };
