import { forwardRef } from "react";
import { styled } from "styled-components";
import { Progress } from "../../loaders/progress";

interface ProgressProps {
  /**
   * The current progress of the player
   */
  progress: number;

  handleSkipAhead: (pageX: number) => void;
  duration: number;
}

const StyledProgress = styled(Progress)`
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.grey[700]};
  cursor: pointer;
  > div {
    border-radius: 0;
  }
`;

export const ProgressBar = forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const { progress, handleSkipAhead } = props;
    return (
      <StyledProgress
        className="progress-bar-1"
        ref={ref}
        value={progress}
        onClick={(e) => handleSkipAhead(e.clientX)}
      />
    );
  }
);
