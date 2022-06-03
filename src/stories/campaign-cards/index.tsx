import { CampaignCardsProps } from "./_types";
import { Card } from "../cards";
import { Tag } from "../tags";
import { theme } from "../theme";
import { Label } from "../label";
import styled from "styled-components";
import { ReactComponent as FunctionalTestIcon } from "../../assets/icons/campaign-functional.svg";
import { ReactComponent as RegressionTestIcon } from "../../assets/icons/campaign-experiential.svg";
import { ReactComponent as CompletedIcon } from "../../assets/icons/campaign-completed.svg";
import { ReactComponent as ProgressIcon } from "../../assets/icons/campaign-progress.svg";
import { ReactComponent as IncomingIcon } from "../../assets/icons/campaign-incoming.svg";
import { CampaignCardSkeleton } from "./skeleton";
import { cardStyle } from "../theme/mixins";
import { SpecialCard } from "../special-cards";
import { SM } from "../typography/typescale";
import { Ellipsis } from "../typography/ellipsis";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return CompletedIcon;
    case "PROGRESS":
      return ProgressIcon;
    case "INCOMING":
      return IncomingIcon;
    default:
      return ProgressIcon;
  }
};

const getTypeDataIcon = (type?: string) => {
  switch (type) {
    case "EXPERIENTIAL":
      return RegressionTestIcon;
    case "FUNCTIONAL":
      return FunctionalTestIcon;
    default:
      return FunctionalTestIcon;
  }
};

const StyledTag = styled(Tag)`
  color: ${({ theme }) => theme.palette.grey["700"]};
  max-width: 75%;
  cursor: pointer;
`;

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.white};
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
    <SpecialCard {...props}>
      <SpecialCard.Meta>
        <StyledLabel>{date}</StyledLabel>
        {isNew && (
          <StyledTagNew
            hue={theme.palette.fuschia["600"]}
            isPill
            size="medium"
            title={labelNew ? labelNew : "New!"}
          >
            {labelNew ? labelNew : "New!"}
          </StyledTagNew>
        )}
      </SpecialCard.Meta>
      <SpecialCard.Header>
        <SpecialCard.Header.Label>
          <Ellipsis style={{ width: "200px" }}>{projectTitle}</Ellipsis>
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title>
          <Ellipsis style={{ width: "200px" }}>{campaignTitle}</Ellipsis>
        </SpecialCard.Header.Title>
      </SpecialCard.Header>
      <SpecialCard.Footer>
        {props.pillText && (
          <StyledTag
            size="large"
            isPill
            isRegular
            hue={theme.palette.grey[100]}
          >
            <Tag.Avatar>
              <PillIcon />
            </Tag.Avatar>
            {props.pillText}
          </StyledTag>
        )}
        <StatusIcon />
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { CampaignCard };
