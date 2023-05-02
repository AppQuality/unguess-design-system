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
  const isSidebarOpen = window.matchMedia(
    `only screen and (min-width: 576px)`
  ).matches;
  return (
    <Chrome isFluid hue={theme.palette.white.toString()}>
      <Body>
        <AppHeader isLoading/>
        <Content>
          <Sidebar
            isExpanded={isSidebarOpen}
            isLoading
          />
          <Main>
            <Skeleton width="30%" height="32px" style={{marginTop: theme.space.sm, marginLeft: theme.space.sm}}/>
            <StyledHr style={{ margin: "24px 0" }} />
            <Row>
              <Col xs={12} md={6} lg={3}>
                <CampaignCard
                  isLoading
                  projectTitle=""
                  campaignTitle=""
                  date=""
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <CampaignCard
                  isLoading
                  projectTitle=""
                  campaignTitle=""
                  date=""
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <CampaignCard
                  isLoading
                  projectTitle=""
                  campaignTitle=""
                  date=""
                />
              </Col>
              <Col xs={12} md={6} lg={3}>
                <CampaignCard
                  isLoading
                  projectTitle=""
                  campaignTitle=""
                  date=""
                />
              </Col>
            </Row>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
