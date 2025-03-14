import { Tag } from "../../tags";
import { theme } from "../../theme";
import { IPlanStatus, PlanCardsProps } from "./_types";
import { SpecialCard } from "../../special-cards";
import { ReactComponent as DraftIcon } from "./icons/draft.svg";
import { ReactComponent as SubmittedIcon } from "./icons/submitted.svg";
import { ReactComponent as WaitingIcon } from "./icons/waiting.svg";
import { CampaignCardSkeleton } from "./skeleton";
import { PlanTag } from "./parts/tag";
import { LabelComponent } from "./parts/Label";
import { TitleComponent } from "./parts/Title";

const getTitleColor = (status: IPlanStatus) => {
  switch (status) {
    case "submitted":
      return theme.palette.grey[800];
    case "pending_quote_review":
      return theme.palette.yellow[700];
    default:
      return theme.palette.azure[800];
  }
};

const PlanCard = ({
  status = "draft",
  i18n,
  children,
  ...props
}: PlanCardsProps) => {
  if (props.isLoading) return <CampaignCardSkeleton />;

  const Icon = (() => {
    switch (status) {
      case "submitted":
        return <SubmittedIcon />;
      case "pending_quote_review":
        return <WaitingIcon />;
      default:
        return <DraftIcon />;
    }
  })();

  return (
    <SpecialCard title={"Setup Activity"} {...props}>
      <SpecialCard.Thumb>{Icon}</SpecialCard.Thumb>
      <SpecialCard.Header style={{ color: getTitleColor(status) }}>
        {children}
      </SpecialCard.Header>

      <SpecialCard.Footer style={{ marginBottom: theme.space.xxs }}>
        <Tag size="large" hue="transparent">
          {i18n?.planLabel ?? "Plan"}
        </Tag>
        <PlanTag
          status={status ?? "draft"}
          statusLabel={i18n?.statusLabel ?? (status as string)}
        />
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

PlanCard.ProjectLabel = LabelComponent;
PlanCard.Title = TitleComponent;

export { PlanCard };
export type { IPlanStatus };
