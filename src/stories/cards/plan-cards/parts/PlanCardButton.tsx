import { ReactComponent as EyeStroke } from "@zendeskgarden/svg-icons/src/16/eye-stroke.svg";
import { Span } from "../../../..";
import { Button } from "../../../buttons/button";
import { ButtonArgs } from "../../../buttons/button/_types";
import { theme } from "../../../theme";
import { IPlanStatus } from "../_types";

export interface PlanCardButtonProps extends ButtonArgs {
  status?: IPlanStatus;
}

export const PlanCardButton = ({
  status,
  ...buttonProps
}: PlanCardButtonProps) => {
  switch (status) {
    case "UnquotedDraft":
    case "PrequotedDraft":
    case "PurchasableDraft":
      return (
        <Button size="small" isPrimary isAccent {...buttonProps}>
          {buttonProps.children}
        </Button>
      );
    case "AwaitingApproval":
    case "AwaitingPayment":
      return (
        <Button size="small" isStretched isPrimary {...buttonProps}>
          {buttonProps.children}
        </Button>
      );
    case "Paying":
    case "Submitted":
    case "OpsCheck":
      return (
        <Button size="small" isStretched isBasic {...buttonProps}>
          <Button.StartIcon>
            <EyeStroke />
          </Button.StartIcon>
          <Span color={theme.palette.blue[600]}>{buttonProps.children}</Span>
        </Button>
      );
    default:
      return <div>{buttonProps.children}</div>;
  }
};
