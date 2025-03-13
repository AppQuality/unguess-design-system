import styled from "styled-components";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { IPlanStatus, PlanCardsProps } from "./_types";

import { SpecialCard } from "../../special-cards";
import { ReactComponent as PlanIcon } from "./icons/plan-icon.svg";
import { ReactComponent as DraftStatusIcon } from "./icons/draft-status.svg";
import { ReactComponent as DraftIcon } from "./icons/draft.svg";
import { ReactComponent as RequestedStatusIcon } from "./icons/requested-status.svg";
import { ReactComponent as RequestedIcon } from "./icons/requested.svg";
import { CampaignCardSkeleton } from "./skeleton";

const getTagColor = (status: IPlanStatus) => {
  switch (status) {
    case "draft":
      return theme.palette.azure[600];
    case "pending_review":
      return theme.palette.yellow[700];
    default:
      return theme.palette.grey[700];
  }
};

const PlanTag = ({
  status,
  statusLabel,
}: {
  status: IPlanStatus;
  statusLabel: string;
}) => {
  const color = getTagColor(status);

  return (
    <StyledTag hue="transparent" color={color} size="large">
      <Tag.Avatar>
        {status === "draft" ? (
          <DraftStatusIcon color={color} />
        ) : (
          <RequestedStatusIcon color={color} />
        )}
      </Tag.Avatar>
      {statusLabel}
    </StyledTag>
  );
};

const StyledTag = styled(Tag)`
  max-width: 85%;
  cursor: pointer;
`;

const PlanCard = ({
  projectTitle,
  campaignTitle,
  status = "draft",
  i18n,
  ...props
}: PlanCardsProps) => {
  if (props.isLoading) return <CampaignCardSkeleton />;

  return (
    <SpecialCard title={campaignTitle} {...props}>
      <SpecialCard.Thumb>
        {status === "draft" ? <DraftIcon /> : <RequestedIcon />}
      </SpecialCard.Thumb>
      <SpecialCard.Header>
        <SpecialCard.Header.Label>{projectTitle}</SpecialCard.Header.Label>
        <SpecialCard.Header.Title style={{ color: getTagColor(status) }}>
          {campaignTitle}
        </SpecialCard.Header.Title>
      </SpecialCard.Header>

      <SpecialCard.Footer>
        <StyledTag size="large">
          <Tag.Avatar>
            <PlanIcon />
          </Tag.Avatar>
          {i18n?.planLabel ?? "Plan"}
        </StyledTag>
        <PlanTag
          status={status ?? "draft"}
          statusLabel={i18n?.statusLabel ?? (status as string)}
        />
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { PlanCard };
