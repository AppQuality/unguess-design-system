import { useVideoContext } from "@appquality/stream-player";
import { styled } from "styled-components";
import { ReactComponent as TagIcon } from "../../../assets/icons/tag-stroke.svg";
import { Button } from "../../buttons/button";
import { Tooltip } from "../../tooltip";
import { Span } from "../../typography/span";
import { PlayerI18n } from "../_types";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { PlayerShortCut } from "../shortcuts";

// Prevent button from breaking on smaller screens
const StyledButton = styled(Button)`
  overflow: visible;
`;

export const Cutter = ({
  onCutHandler,
  isCutting,
  i18n,
}: {
  onCutHandler?: (time: number) => void;
  isCutting?: boolean;
  i18n?: PlayerI18n;
}) => {
  const { context } = useVideoContext();

  const videoRef = context.player?.ref.current;

  if (!onCutHandler) return null;

  return (
    <Tooltip
      type="light"
      size="medium"
      maxWidth="unset"
      content={
        <PlayerShortCut type="observation">
          {i18n?.observations || "Start/stop new observation"}
        </PlayerShortCut>
      }
    >
      <StyledButton
        isPrimary
        isAccent={!isCutting}
        onClick={(e) => {
          if (videoRef) {
            onCutHandler(videoRef.currentTime);
          }
          e.stopPropagation();
        }}
      >
        {isCutting ? (
          <>
            <Button.StartIcon>
              <TagIcon />
            </Button.StartIcon>
            <Span>{i18n?.onHighlight || "End observation"}</Span>
          </>
        ) : (
          <>
            <Button.StartIcon>
              <PlusIcon />
            </Button.StartIcon>
            <Span>{i18n?.beforeHighlight || "Start observation"}</Span>
          </>
        )}
      </StyledButton>
    </Tooltip>
  );
};
