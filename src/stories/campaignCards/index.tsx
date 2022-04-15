import { CampaignCardsProps } from "./_types";
import { Card } from "../cards";
import { Tag } from "../tags";
import { theme } from "../theme";
import { Label } from "../label";
import styled from "styled-components";
import { ReactComponent as FunctionalTestIcon } from "../../assets/icons/functional-test-round-icon.svg";
import { ReactComponent as RegressionTestIcon } from "../../assets/icons/regression-test-round-icon.svg";
import { ReactComponent as CompletedIcon } from "../../assets/icons/completed-status-round-icon.svg";
import { ReactComponent as ProgressIcon } from "../../assets/icons/on-going-status-round-icon.svg";
import { ReactComponent as IncomingIcon } from "../../assets/icons/arrival-status-round-icon.svg";
import React from "react";
import { CampaignCardSkeleton } from "./skeleton";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return CompletedIcon;
    case "PROGRESS":
      return ProgressIcon;
    case "INCOMING":
      return IncomingIcon;
  }
};

const getTypeData = (type?: string) => {
  switch (type) {
    case "EXPERIENTIAL":
      return {
        pillIcon: RegressionTestIcon,
      };
    case "FUNCTIONAL":
      return {
        pillIcon: FunctionalTestIcon,
      };
  }
};

export const Wrapper = styled(Card)`
  border-radius: ${theme.borderRadii.lg};
  padding: 1rem;
  border: 1px solid ${theme.palette.grey["200"]};
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: ${theme.shadows.boxShadow(theme)};
  }

  cursor: pointer;
`;

const StyledTag = styled(Tag)`
  color: ${theme.palette.grey["700"]};
  max-width: 75%;
  cursor: pointer;
`;

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${theme.space.base}px ${({ theme }) => theme.space.base * 2}px;
  color: ${theme.palette.white};
`;

const StyledLabel = styled(Label)`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.palette.grey["500"]};
  cursor: pointer;
`;

const StyledTitleLabel = styled(Label)`
  color: ${theme.palette.blue["600"]};
  font-size: ${theme.fontSizes.lg};
  word-wrap: break-word;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${theme.space.lg} 0;
  background-color: ${theme.palette.grey["300"]};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: ${theme.space.base * 6}px;
`;

export const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${theme.space.xxl};
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

  const StatusIcon = getStatusIcon(status ?? "PROGRESS") as React.ElementType;
  const typeData = getTypeData(type);
  const PillIcon = typeData?.pillIcon as React.ElementType;

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
        {typeData && (
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
