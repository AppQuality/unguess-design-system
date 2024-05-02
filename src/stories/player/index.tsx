import Video, { useVideoContext } from "@appquality/stream-player";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { PlayerArgs } from "./_types";
import { Container } from "./parts/container";
import { Controls } from "./parts/controls";
import { FloatingControls } from "./parts/floatingControls";
import { VideoSpinner } from "./parts/spinner";

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
    const { context, togglePlay, setIsPlaying } = useVideoContext();
    const { onCutHandler, bookmarks, isCutting } = props;
    const videoRef = context.player?.ref.current;
    const isLoaded = !!videoRef;
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardRef, () => videoRef as HTMLVideoElement);

    useEffect(() => {
      if (videoRef) {
        videoRef.addEventListener("pause", () => {
          setIsPlaying(false);
        });
      }

      return () => {
        if (videoRef) {
          videoRef.removeEventListener("pause", () => {
            setIsPlaying(false);
          });
        }
      };
    }, [setIsPlaying, videoRef]);

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
        <Controls
          container={containerRef.current}
          onCutHandler={onCutHandler}
          bookmarks={bookmarks}
          isCutting={isCutting}
        />
      </Container>
    );
  }
);

export { Player };
