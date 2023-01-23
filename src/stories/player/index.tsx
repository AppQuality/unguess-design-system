import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Controls, ControlsWrapper } from "./parts/controls";
import { Video } from "./parts/video";
import { PlayerArgs } from "./_types";

const Container = styled.div<{ isLoaded: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  video {
    ${({ isLoaded }) => !isLoaded && "opacity: .5;"}
  }

  &:hover {
    ${ControlsWrapper} {
      display: flex;
    }
  }

  background-color: ${({ theme }) => theme.palette.grey[700]};
`;

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

  const handleLoad = () => {
    console.log("loaded");
    setIsLoaded(true);
  };

  useEffect(() => {
    console.log(videoRef.current);
  }, [videoRef]);

  return (
    <Container isLoaded={isLoaded}>
      {!isLoaded && <>Loading...</>}
      <Video ref={videoRef} onLoadedData={handleLoad} preload="auto">
        {props.children}
      </Video>
      <Controls
        videoRef={videoRef.current}
        isPlaying={isPlaying}
        onPlayChange={(isPlaying) => setIsPlaying(isPlaying)}
      />
    </Container>
  );
};

export { Player };
