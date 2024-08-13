import { CampaignCardsProps } from "./_types";
import { Meta, StoryFn } from "@storybook/react";
import { CampaignCard } from "./index";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { theme } from "../theme";
import styled from "styled-components";

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819",
};

const defaultArgs: CampaignCardsProps = {
  isNew: true,
  date: "24/04/2022",
  projectTitle: "This is the project title",
  campaignTitle: "This is the campaign title",
  status: "COMPLETED",
  type: "EXPERIENTIAL",
  pillText: "Experiential Testone Lungone Furbone",
  isLoading: false,
};

const StyledRow = styled(Row)``;

const CardsContainer = styled.div`
  ${StyledRow} {
    overflow-x: auto;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const MultiTemplate: StoryFn<CampaignCardsProps> = (args) => {
  return (
    <CardsContainer>
      <StyledRow>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <CampaignCard
            {...args}
            projectTitle={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
            }
            campaignTitle={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
            }
            type={"FUNCTIONAL"}
            date={"20/10/2022"}
            status={"INCOMING"}
          />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <CampaignCard {...args} isNew={false} status={"PROGRESS"} />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <CampaignCard
            {...args}
            isNew={false}
            type={"FUNCTIONAL"}
            pillText={"Functional Test"}
          />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <CampaignCard {...args} isNew={false} />
        </Col>
      </StyledRow>
    </CardsContainer>
  );
};

const SingleTemplate: StoryFn<CampaignCardsProps> = (args) => {
  return <CampaignCard {...args} />;
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  ...defaultArgs,
};

export const Grid = MultiTemplate.bind({});
Grid.args = {
  ...defaultArgs,
};

Grid.parameters = {
  design,
};

export default {
  title: "Molecules/Card/CampaignCard",
  component: CampaignCard,
  argTypes: {
    isRecessed: {
      table: {
        disable: true,
      },
    },
    isFloating: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof CampaignCard>;
