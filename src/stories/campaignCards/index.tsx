import { CampaignCardsProps } from "./_types";
import { Well as ZendeskWell } from "@zendeskgarden/react-notifications"
import { Tag } from "../tags";
import { theme } from "../theme";
import { Label } from "../label";
import styled from "styled-components";
import { ReactComponent as FunctionalTestIcon } from "../../assets/icons/functional-test-round-icon.svg";
import { ReactComponent as RegressionTestIcon } from "../../assets/icons/regression-test-round-icon.svg";
import { ReactComponent as CompletedIcon } from "../../assets/icons/completed-status-round-icon.svg";
import { ReactComponent as OnGoingIcon } from "../../assets/icons/on-going-status-round-icon.svg";
import { ReactComponent as ArrivalIcon } from "../../assets/icons/arrival-status-round-icon.svg";
import React from "react";
import { Col } from "../grid/col";
import { Row } from "../grid/row";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return CompletedIcon
    case "ON_GOING":
      return OnGoingIcon
    case "ARRIVING":
      return ArrivalIcon
  }
}

const getTypeData = (type?: string) => {
  switch (type) {
    case "REGRESSION":
      return {
        pillIcon: RegressionTestIcon,
        pillText: "Regression testing"
      }
    case "FUNCTIONAL":
      return {
        pillIcon: FunctionalTestIcon,
        pillText: "Functional test"
      }
  }
}

const Wrapper = styled(ZendeskWell)`
  border-radius: 15px;
  padding: 1rem;
  border: transparent;
`

const StyledLabel = styled(Label)`
  color: ${theme.palette.grey["500"]}
`

const StyledTitleLabel = styled(Label)`
  color: ${theme.palette.blue["600"]};
  font-size: ${theme.fontSizes.xl};
  word-wrap: break-word;
`

const Divider = () => {
  return <div style={{
    width: "100%",
    marginBottom: '1rem',
    overflow: "hidden",
    border: `solid 0.5px ${theme.palette.grey["300"]}`
  }}/>
}


const StyledCol = styled(Col)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem;
`

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
`

const getFormattedLocaleDate = () => {
  return new Date().toLocaleString().substring(0,10)
}

const CampaignCard = (props: CampaignCardsProps) => {
  const {isNew, date, title, subTitle, status, type} = props
  const shownDate = date === getFormattedLocaleDate() ? "Today" : date


  const StatusIcon = getStatusIcon(status ?? "ON_GOING") as React.ElementType
  const typeData = getTypeData(type)
  const PillIcon = typeData?.pillIcon as React.ElementType

  return <Wrapper>
    <StyledRow>
      <StyledLabel isRegular>{shownDate}</StyledLabel>
      {isNew && <Tag hue={theme.palette.fuschia["600"]}
                     isPill
                     size="medium"
                     title="New!">New!</Tag>}
    </StyledRow>
    <StyledCol>
      <StyledLabel isRegular>{title}</StyledLabel>
      <StyledTitleLabel isRegular>{subTitle}</StyledTitleLabel>
    </StyledCol>
    <StyledRow>
      <Divider/>
      {typeData &&
        <Tag size="large"
             isPill
             isRegular>
          <Tag.Avatar>
            <PillIcon />
          </Tag.Avatar>
          {typeData.pillText}
        </Tag>
      }
      <StatusIcon />
    </StyledRow>
  </Wrapper>;
}

export { CampaignCard }