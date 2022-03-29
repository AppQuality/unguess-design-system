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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return CompletedIcon
    case "PROGRESS":
      return ProgressIcon
    case "INCOMING":
      return IncomingIcon
  }
}

const getTypeData = (type?: string) => {
  switch (type) {
    case "EXPERIENTIAL":
      return {
        pillIcon: RegressionTestIcon,
      }
    case "FUNCTIONAL":
      return {
        pillIcon: FunctionalTestIcon,
      }
  }
}

const Wrapper = styled(Card)`
  border-radius: ${theme.borderRadii.lg};
  padding: 1rem;
  border: 1px solid ${theme.palette.grey["200"]};

  &:hover {
    box-shadow: ${theme.shadows.boxShadow(theme)};
  }
`

const StyledTag = styled(Tag)`
  color: ${theme.palette.grey["700"]};
`

const StyledTagNew = styled(Tag)`
  height: ${({theme}) => theme.space.base * 6}px;
  padding: ${theme.space.base}px ${({theme}) => theme.space.base * 2}px;
  color: ${theme.palette.white};
`

const StyledLabel = styled(Label)`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.palette.grey["500"]}
`

const StyledTitleLabel = styled(Label)`
  color: ${theme.palette.blue["600"]};
  font-size: ${theme.fontSizes.lg};
  word-wrap: break-word;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${theme.space.lg} 0;
  background-color: ${theme.palette.grey["300"]};
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${theme.space.xxl};
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const getFormattedLocaleDate = () => {
  return new Date().toLocaleString().substring(0, 10)
}

const CampaignCard = (props: CampaignCardsProps) => {
  const { isNew, date, title, subTitle, status, type } = props
  const shownDate = date === getFormattedLocaleDate() ? "Today" : date

  const StatusIcon = getStatusIcon(status ?? "PROGRESS") as React.ElementType
  const typeData = getTypeData(type)
  const PillIcon = typeData?.pillIcon as React.ElementType

  let titleCut = title;
  if (title.length > 42) {
    titleCut = `${title.substring(0, 39)}...`
  }

  let subTitleCut = subTitle;
  if (subTitle.length > 29) {
    subTitleCut = `${subTitle.substring(0, 26)}...`
  }

  return <Wrapper {...props}>
    <CardHeader>
      <StyledLabel isRegular>{shownDate}</StyledLabel>
      {isNew && (
        <StyledTagNew hue={theme.palette.fuschia["600"]}
          isPill
          size="medium"
          title="New!">New!</StyledTagNew>
      )}
    </CardHeader>
    <CardBody>
      <StyledLabel isRegular>{titleCut}</StyledLabel>
      <StyledTitleLabel isRegular>{subTitleCut}</StyledTitleLabel>
    </CardBody>
    <Divider />
    <CardFooter>
      {typeData &&
        <StyledTag size="large"
          isPill
          isRegular
          hue={theme.palette.grey[100]}>
          <Tag.Avatar>
            <PillIcon />
          </Tag.Avatar>
          {props.pillText}
        </StyledTag>
      }
      <StatusIcon />
    </CardFooter>
  </Wrapper>;
}

export { CampaignCard }