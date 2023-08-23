import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Video, { useVideoContext } from "@appquality/stream-player";
import { Container } from "./parts/container";
import { Controls } from "./parts/controls";
import { FloatingControls } from "./parts/floatingControls";
import { VideoSpinner } from "./parts/spinner";
import { PlayerArgs } from "./_types";

/**
 * The Player is a styled media tag with custom controls
 * <hr>
 * Used for this:
    - To display a video 
 */
const Player = forwardRef<HTMLVideoElement, PlayerArgs>((props, forwardRef) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(forwardRef, () => videoRef.current as HTMLVideoElement);

  return (
    <Video src={props.url} {...props}>
      <PlayerCore ref={videoRef} {...props} />
    </Video>
  );
});

const PlayerCore = forwardRef<HTMLVideoElement, PlayerArgs>(
  (props, forwardRef) => {
    const { context, togglePlay } = useVideoContext();
    const videoRef = context.player?.ref.current;
    const isLoaded = !!videoRef;
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardRef, () => videoRef as HTMLVideoElement);

    return (
      <Container
        isLoaded={isLoaded}
        isPlaying={context.isPlaying}
        ref={containerRef}
      >
        {!isLoaded ? (
          <VideoSpinner />
        ) : (
          <FloatingControls
            isPlaying={context.isPlaying}
            onClick={togglePlay}
          />
        )}
        <Video.Player className="player-container" />
        <Controls container={containerRef.current} />
      </Container>
    );
  }
);

export { Player };
