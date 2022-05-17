import { CampaignCardsProps } from "./_types";
import { Card } from "../cards";
import { Tag } from "../tags";
import { theme } from "../theme";
import { Label } from "../label";
import styled from "styled-components";
import { ReactComponent as FunctionalTestIcon } from "../../assets/icons/functional-test-icon.svg";
import { ReactComponent as RegressionTestIcon } from "../../assets/icons/experiential-test-icon.svg";
import { ReactComponent as CompletedIcon } from "../../assets/icons/completed-status-round-icon.svg";
import { ReactComponent as ProgressIcon } from "../../assets/icons/on-going-status-round-icon.svg";
import { ReactComponent as IncomingIcon } from "../../assets/icons/arrival-status-round-icon.svg";
import { CampaignCardSkeleton } from "./skeleton";
import { cardStyle } from "../theme/mixins";

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

export const Wrapper = styled(Card)`
  ${cardStyle}
`;

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

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey["500"]};
  cursor: pointer;
`;

const StyledTitleLabel = styled(Label)`
  color: ${({ theme }) => theme.palette.blue["600"]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  word-wrap: break-word;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.space.lg} 0;
  background-color: ${({ theme }) => theme.palette.grey["300"]};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: ${({ theme }) => theme.space.base * 6}px;
`;

export const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.xxl};
  flex: 1;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const CampaignCard = (props: CampaignCardsProps) => {
  const { isNew, date, projectTitle, campaignTitle, status, type, labelNew } =
    props;

  const StatusIcon = getStatusIcon(status ?? "PROGRESS");
  const PillIcon = getTypeDataIcon(type);

  let projectTitleCut = projectTitle;
  if (projectTitle.length > 42) {
    projectTitleCut = `${projectTitle.substring(0, 39)}...`;
  }

  let campaignTitleCut = campaignTitle;
  if (campaignTitle.length > 29) {
    campaignTitleCut = `${campaignTitle.substring(0, 26)}...`;
  }

  return props.isLoading ? (
    <CampaignCardSkeleton />
  ) : (
    <Wrapper {...props}>
      <CardHeader>
        <StyledLabel isRegular>{date}</StyledLabel>
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
      </CardHeader>
      <CardBody>
        <StyledLabel isRegular>{projectTitleCut}</StyledLabel>
        <StyledTitleLabel isRegular>{campaignTitleCut}</StyledTitleLabel>
      </CardBody>
      <Divider />
      <CardFooter>
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
      </CardFooter>
    </Wrapper>
  );
};

export { CampaignCard };
