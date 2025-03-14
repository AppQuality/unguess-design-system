import { Tag } from "../../../tags";
import { theme } from "../../../theme";
import { IPlanStatus } from "../_types";
import { ReactComponent as DraftStatusIcon } from "../icons/draft-status.svg";
import { ReactComponent as SubmittedStatusIcon } from "../icons/submitted-status.svg";
import { ReactComponent as WaitingStatusIcon } from "../icons/waiting-status.svg";

/**
 * Almost duplicated getTitleColor switch cause design requires slightly different colors
 * for the status tag.
 */
const getTagColor = (status: IPlanStatus) => {
  switch (status) {
    case "submitted":
      return theme.palette.grey[800];
    case "pending_quote_review":
      return theme.palette.yellow[700];
    default:
      return theme.palette.azure[800];
  }
};

export const PlanTag = ({
  status,
  statusLabel,
}: {
  status: IPlanStatus;
  statusLabel: string;
}) => {
  const color = getTagColor(status);

  const Icon = (() => {
    switch (status) {
      case "submitted":
        return <SubmittedStatusIcon />;
      case "pending_quote_review":
        return <WaitingStatusIcon />;
      default:
        return <DraftStatusIcon />;
    }
  })();

  return (
    <Tag hue="transparent" color={color} size="large">
      <Tag.Avatar>{Icon}</Tag.Avatar>
      {statusLabel}
    </Tag>
  );
};
