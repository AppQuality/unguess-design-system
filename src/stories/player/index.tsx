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
    console.log("loaded");
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

  useEffect(() => {
    console.log(videoRef.current);
  }, [videoRef]);

  return (
    <Container
      isLoaded={isLoaded}
      isPlaying={isPlaying}
      onClick={handlePlayPause}
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
