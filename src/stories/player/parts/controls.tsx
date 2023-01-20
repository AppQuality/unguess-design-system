import { useCallback } from "react";
import { IconButton } from "../../buttons/icon-button";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play-fill.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${({ theme }) => theme.space.xxs};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  display: flex;
  justify-content: space-between;
`;

const LeftControls = styled.div``;
const CenterControls = styled.div``;
const RightControls = styled.div``;

export const Controls = ({
  videoRef,
}: {
  videoRef: HTMLVideoElement | null;
}) => {
  const handlePlay = useCallback(() => {
    if (!videoRef) return;
    if (videoRef.paused) {
      videoRef.play();
    } else {
      videoRef.pause();
    }
  }, [videoRef]);

  return (
    <Wrapper>
      <LeftControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </LeftControls>
      <CenterControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </CenterControls>
      <RightControls>
        <IconButton isNeutral onClick={handlePlay}>
          <PlayIcon />
        </IconButton>
      </RightControls>
    </Wrapper>
  );
};
