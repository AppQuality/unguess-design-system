import { useVideoContext } from "@appquality/stream-player";
import { ReactComponent as TagIcon } from "../../../assets/icons/tag-stroke.svg";
import { Button } from "../../buttons/button";
import { PlayerI18n } from "../_types";

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
    <Button
      isPrimary
      isAccent
      size={"small"}
      onClick={(e) => {
        if (videoRef) {
          onCutHandler(videoRef.currentTime);
        }
        e.stopPropagation();
      }}
    >
      <Button.StartIcon>
        <TagIcon />
      </Button.StartIcon>
      {isCutting
        ? i18n?.onHighlight || "Click again to stop"
        : i18n?.beforeHighlight || "New highlight"}
    </Button>
  );
};
