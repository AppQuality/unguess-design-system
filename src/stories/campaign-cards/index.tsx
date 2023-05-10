import { CampaignCardsProps } from "./_types";
import { Tag } from "../tags";
import { theme } from "../theme";
import styled from "styled-components";
import {
  StatusCompletedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
} from "../icons";
import { CampaignCardSkeleton } from "./skeleton";
import { SpecialCard } from "../special-cards";
import { SM } from "../typography/typescale";
import { Ellipsis } from "../typography/ellipsis";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return StatusCompletedIcon;
    case "PROGRESS":
      return StatusRunningIcon;
    case "INCOMING":
      return StatusIncomingIcon;
    default:
      return StatusRunningIcon;
  }
};

const getTypeDataIcon = (type?: string) => {
  switch (type) {
    case "EXPERIENTIAL":
      return CampaignExperientialIcon;
    case "FUNCTIONAL":
      return CampaignFunctionalIcon;
    default:
      return CampaignFunctionalIcon;
  }
};

const StyledTag = styled(Tag)`
  max-width: 85%;
  cursor: pointer;
`;

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
`;

const StyledLabel = styled(SM)`
  color: ${({ theme }) => theme.palette.grey["500"]};
`;

const CampaignCard = ({
  isNew,
  date,
  projectTitle,
  campaignTitle,
  status,
  type,
  labelNew,
  ...props
}: CampaignCardsProps) => {
  const StatusIcon = getStatusIcon(status ?? "PROGRESS");
  const PillIcon = getTypeDataIcon(type);

  return props.isLoading ? (
    <CampaignCardSkeleton />
  ) : (
    <SpecialCard title={campaignTitle} {...props}>
      <SpecialCard.Meta>
        <StyledLabel>{date}</StyledLabel>
        {isNew && (
          <StyledTagNew
            hue={theme.palette.fuschia["600"]}
            color={theme.palette.white}
            isPill
            size="medium"
            title={labelNew ? labelNew : "New!"}
          >
            {labelNew ? labelNew : "New!"}
          </StyledTagNew>
        )}
      </SpecialCard.Meta>

      <SpecialCard.Header>
        <SpecialCard.Header.Label>{projectTitle}</SpecialCard.Header.Label>
        <SpecialCard.Header.Title>{campaignTitle}</SpecialCard.Header.Title>
      </SpecialCard.Header>

      <SpecialCard.Footer>
        {props.pillText && (
          <StyledTag size="large">
            <Tag.Avatar>
              <PillIcon />
            </Tag.Avatar>
            <Ellipsis>{props.pillText}</Ellipsis>
          </StyledTag>
        )}
        <StatusIcon />
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { CampaignCard };
