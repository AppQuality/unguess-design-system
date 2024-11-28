import Video, { useVideoContext } from "@appquality/stream-player";
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { PlayerArgs } from "./_types";
import { ProgressContextProvider } from "./context/progressContext";
import { useKeyboardCommands } from "./hooks/useKeyboardCommands";
import { usePictureInPicture } from "./hooks/usePictureInPicture";
import { Container } from "./parts/container";
import { Controls } from "./parts/controls";
import { FloatingControls } from "./parts/floatingControls";
import { VideoSpinner } from "./parts/spinner";
import { PlayerShortCut } from "./shortcuts";

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
    const { onCutHandler, bookmarks, isCutting, pipMode, onPipChange } = props;
    const videoRef = context.player?.ref.current;
    const isLoaded = !!videoRef;
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardRef, () => videoRef as HTMLVideoElement, [
      videoRef,
    ]);

    useKeyboardCommands({
      setIsPlaying,
      onCutHandler,
      videoRef,
      onShortcut: props.onShortcut,
    });
    usePictureInPicture(videoRef, pipMode, onPipChange);

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
        <ProgressContextProvider>
          <Controls
            container={containerRef.current}
            onCutHandler={onCutHandler}
            bookmarks={bookmarks}
            isCutting={isCutting}
            onBookMarkUpdated={props.handleBookmarkUpdate}
            i18n={props.i18n}
          />
        </ProgressContextProvider>
      </Container>
    );
  },
);

const PlayerProvider = (props: PropsWithChildren<PlayerArgs>) => (
  <Video src={props.url} {...props}>
    {props.children}
  </Video>
);

PlayerProvider.Core = PlayerCore;

PlayerProvider.Shortcut = PlayerShortCut;

export { Player, PlayerProvider, useVideoContext };
