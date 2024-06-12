import Video, { useVideoContext } from "@appquality/stream-player";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { PlayerArgs } from "./_types";
import { Container } from "./parts/container";
import { Controls } from "./parts/controls";
import { FloatingControls } from "./parts/floatingControls";
import { VideoSpinner } from "./parts/spinner";
import { ProgressContextProvider } from "./context/progressContext";

/**
 * The Player is a styled media tag with custom controls
 * <hr>
 * Used for this:
    - To display a video 
 */
const Player = forwardRef<HTMLVideoElement, PlayerArgs>((props, forwardRef) => (
  <Video src={props.url} {...props}>
    <PlayerCore ref={forwardRef} {...props} />
  </Video>
));

const PlayerCore = forwardRef<HTMLVideoElement, PlayerArgs>(
  (props, forwardRef) => {
    const { context, togglePlay, setIsPlaying } = useVideoContext();
    const { onCutHandler, bookmarks, isCutting } = props;
    const videoRef = context.player?.ref.current;
    const isLoaded = !!videoRef;
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardRef, () => videoRef as HTMLVideoElement, [videoRef]);

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
        showControls={props.showControls}
      >
        {!isLoaded ? (
          <VideoSpinner />
        ) : (
          <FloatingControls
            isPlaying={context.isPlaying}
            showControls={props.showControls}
            onClick={togglePlay}
          />
        )}
        <Video.Player className="player-container" />
        <ProgressContextProvider>
          <Controls
            container={containerRef.current}
            onCutHandler={onCutHandler}
            bookmarks={bookmarks}
            isCutting={isCutting}
            onBookMarkUpdated={props.handleBookmarkUpdate}
            i18n={props.i18n}
            showControls={props.showControls}
          />
        </ProgressContextProvider>
      </Container>
    );
  }
);

export { Player };
