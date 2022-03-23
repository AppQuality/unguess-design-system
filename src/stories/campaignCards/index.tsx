import { CampaignCardsProps, Status, statusIcons, TestType } from "./_types";
import { Well as ZendeskWell } from "@zendeskgarden/react-notifications"
import { Tag } from "../tags";
import { theme } from "../theme";
import { Label } from "../label";
import styled from "styled-components";
import { ReactComponent as UsabilityTestIcon } from "../../assets/usability-test-round-icon.svg";

const getWrapper = (debug: boolean) => styled(ZendeskWell)`
  width: 30%;
  border-radius: 15px;
  padding: 0.2rem;
  ${debug ? '' : 'border: transparent'}
`


const StyledLabel = styled(Label)`
  color: ${theme.palette.grey["500"]}
`

const StyledTitleLabel = styled(Label)`
  color: ${theme.palette.blue["600"]};
  font-size: ${theme.fontSizes.xl};
`

const Divider = () => {
  return <div style={{
    width: "100%",
    overflow: "hidden",
    border: `solid 1px ${theme.palette.grey["300"]}`
  }}/>
}

const getFlexContainer = (direction: string, align: string) => styled(ZendeskWell)`
  display: flex;
  align-items: ${align};
  flex-direction: ${direction};
  justify-content: space-between;
  border: transparent;
`

const CampaignCard = (props: CampaignCardsProps) => {
  const {isNew, date, title, subTitle, status, testType} = props

  const HorizontalContainer = getFlexContainer("row", "center")
  const VerticalContainer = getFlexContainer("column", "flex-start")
  const Wrapper = getWrapper(true)

  const StatusIcon = statusIcons[status] || statusIcons[Status.COMPLETED]
  console.log(TestType.USABILITY_TEST)
  console.log(Status.COMPLETED)
  return <Wrapper>
    <HorizontalContainer>
      <StyledLabel isRegular>{date}</StyledLabel>
      {isNew && <Tag hue={theme.palette.purple["600"]}
                     isPill
                     size="large"
                     title="New!">New!</Tag>}
    </HorizontalContainer>
    <VerticalContainer>
      <StyledLabel isRegular>{title}</StyledLabel>
      <StyledTitleLabel isRegular>{subTitle}</StyledTitleLabel>
      <Divider/>
    </VerticalContainer>
    <HorizontalContainer>
      <Tag size="large"
           isPill
           isRegular>
        <Tag.Avatar>
          <UsabilityTestIcon />
        </Tag.Avatar>
        {/*{TestType[testType]}*/}
      </Tag>
      <StatusIcon />
    </HorizontalContainer>
  </Wrapper>;
}
//TODO test type text and icon, less padding to the card
export { CampaignCard }