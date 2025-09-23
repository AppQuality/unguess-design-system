import { Tag } from "../../../../tags";
import { theme } from "../../../../theme";
import { IPlanStatus } from "../../_types";
import { ReactComponent as DraftStatusIcon } from "../../icons/draft-status.svg";
import { ReactComponent as SubmittedStatusIcon } from "../../icons/submitted-status.svg";
import { ReactComponent as WaitingStatusIcon } from "../../icons/waiting-status.svg";
import { ReactComponent as ApprovedStatusIcon } from "../../icons/approved-status.svg";
import { ReactComponent as PaymentStatusIcon } from "../../icons/payment-status.svg";

export interface IPlanTagProps {
  status: IPlanStatus;
  statusLabel: string;
}
/**
 * Almost duplicated getTitleColor switch cause design requires slightly different colors
 * for the status tag.
 */
const getTagColor = (status: IPlanStatus) => {
  switch (status) {
    case "Submitted":
      return theme.palette.grey[800];
    case "AwaitingApproval":
    case "OpsCheck":
    case "AwaitingPayment":
      return theme.palette.yellow[700];
    case "Accepted":
    case "RunningPlan":
    case "PurchasedPlan":
      return theme.palette.azure[600];
    case "Paying":
      return theme.palette.grey[600];
    default:
      return theme.palette.azure[800];
  }
};

export const PlanTag = ({ status, statusLabel }: IPlanTagProps) => {
  const color = getTagColor(status);

  const Icon = (() => {
    switch (status) {
      case "Submitted":
        return <SubmittedStatusIcon />;
      case "AwaitingApproval":
      case "OpsCheck":
      case "AwaitingPayment":
        return <WaitingStatusIcon />;
      case "Accepted":
      case "RunningPlan":
      case "PurchasedPlan":
        return <ApprovedStatusIcon />;
      case "Paying":
        return <PaymentStatusIcon />;
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
