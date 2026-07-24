import { useVideoContext } from "@appquality/stream-player";
import { styled } from "styled-components";
import { ReactComponent as TagIcon } from "../../../assets/icons/tag-stroke.svg";
import { Button } from "../../buttons/button";
import { Tooltip } from "../../tooltip";
import { Span } from "../../typography/span";
import { PlayerI18n } from "../_types";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

// Prevent button from breaking on smaller screens
const StyledButton = styled(Button)`
  overflow: visible;
`;

// Disabled buttons don't fire mouse events, so the Tooltip needs
// a non-disabled wrapper to trigger on hover
const TooltipTrigger = styled.span`
  display: inline-block;
`;

export const Cutter = ({
  onCutHandler,
  isCutting,
  i18n,
  disable = false,
  tooltipText,
}: {
  onCutHandler?: (time: number) => void;
  isCutting?: boolean;
  i18n?: PlayerI18n;
  disable?: boolean;
  tooltipText?: string;
}) => {
  const { context } = useVideoContext();

  const videoRef = context.player?.ref.current;

  if (!onCutHandler) return null;

  const button = (
    <StyledButton
      isPrimary
      isAccent={!isCutting}
      disabled={disable}
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
  );

  if (!tooltipText) return button;

  return (
    <Tooltip type="light" size="medium" maxWidth="unset" content={tooltipText}>
      <TooltipTrigger>{button}</TooltipTrigger>
    </Tooltip>
  );
};
