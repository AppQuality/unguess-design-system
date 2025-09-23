import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import styled from "styled-components";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { theme } from "../../theme";
import { PlanCardsProps } from "./_types";
import { PlanCard } from "./index";

interface StoryArgs extends PlanCardsProps {
  projectTitle: string;
  campaignTitle: string;
}

const defaultArgs: StoryArgs = {
  projectTitle: "This is the project title",
  campaignTitle: "This is the campaign title",
  i18n: {
    statusLabel: "Draft",
  },
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

const MultiTemplate: Story<StoryArgs> = (args) => {
  return (
    <CardsContainer>
      <StyledRow>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard {...args}>
            <PlanCard.ProjectLabel>{args.projectTitle}</PlanCard.ProjectLabel>
            <PlanCard.Title>{args.campaignTitle}</PlanCard.Title>
          </PlanCard>
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard
            {...args}
            status={"AwaitingApproval"}
            i18n={{ statusLabel: "Requested" }}
          >
            <PlanCard.ProjectLabel>{args.projectTitle}</PlanCard.ProjectLabel>
            <PlanCard.Title>{args.campaignTitle}</PlanCard.Title>
          </PlanCard>
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard {...args}>
            <PlanCard.ProjectLabel>{args.projectTitle}</PlanCard.ProjectLabel>
            <PlanCard.Title>{args.campaignTitle}</PlanCard.Title>
          </PlanCard>
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard
            {...args}
            status={"Submitted"}
            i18n={{ statusLabel: "Submitted" }}
          >
            <PlanCard.ProjectLabel>{args.projectTitle}</PlanCard.ProjectLabel>
            <PlanCard.Title>{args.campaignTitle}</PlanCard.Title>
          </PlanCard>
        </Col>
      </StyledRow>
    </CardsContainer>
  );
};

const SingleTemplate: Story<StoryArgs> = (args) => {
  return (
    <PlanCard {...args}>
      <PlanCard.ProjectLabel>{args.projectTitle}</PlanCard.ProjectLabel>
      <PlanCard.Title>{args.campaignTitle}</PlanCard.Title>
    </PlanCard>
  );
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  ...defaultArgs,
};

export const i18nCard = SingleTemplate.bind({});
i18nCard.storyName = "i18n";
i18nCard.args = {
  ...defaultArgs,
  projectTitle: "Questo è il titolo del progetto",
  campaignTitle: "Questo è il titolo della campagna",
  i18n: { statusLabel: "Bozza", planLabel: "Piano" },
};

export const Grid = MultiTemplate.bind({});
Grid.args = {
  ...defaultArgs,
};

export default {
  title: "Molecules/Card/PlanCard",
  component: PlanCard,
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
} as ComponentMeta<typeof PlanCard>;
