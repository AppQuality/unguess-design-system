import { Chrome } from "@zendeskgarden/react-chrome";
import { Body } from "../navigation/body";
import { Content } from "../navigation/content";
import { AppHeader } from "../navigation/app-header";
import { Sidebar } from "../navigation/sidebar";
import { Main } from "../navigation/main";
import { theme } from "../theme";
import { Skeleton } from "../loaders/skeleton";
import styled from "styled-components";
import { CampaignCard } from "../campaign-cards";
import { Col } from "../grid/col";
import { Row } from "../grid/row";

const StyledHr = styled.hr`
  margin: ${theme.space.base * 6}px 0 ${theme.space.base * 8}px 0;
  border: none;
  border-top: 1px solid ${theme.palette.grey[300]};
`;

export const PageLoader = () => {
  return (
    <Chrome isFluid hue={theme.palette.white}>
      <Body>
        <AppHeader isLoading />
        <Content>
          <Sidebar isLoading />
          <Main>
            <Skeleton width="30%" height="32px" />
            <StyledHr style={{margin: "24px 0"}}/>
            <Row>
              <Col size={3}>
                <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
              </Col>
              <Col size={3}>
                <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
              </Col>
              <Col size={3}>
                <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
              </Col>
              <Col size={3}>
                <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
              </Col>
            </Row>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
