import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import styled from "styled-components";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { theme } from "../../theme";
import { PlanCardsProps } from "./_types";
import { PlanCard } from "./index";

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819",
};

const defaultArgs: PlanCardsProps = {
  projectTitle: "This is the project title",
  campaignTitle: "This is the campaign title",
  status: "draft",
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

const MultiTemplate: Story<PlanCardsProps> = (args) => {

  return (
    <CardsContainer>
      <StyledRow>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard
            {...args}
            projectTitle={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
            }
            campaignTitle={
              "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
            }
          />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard
            {...args}
            status={"pending_review"}
            i18n={{ statusLabel: "Requested" }}
          />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard {...args} />
        </Col>
        <Col xs={10} md={6} lg={3} style={{ marginBottom: theme.space.sm }}>
          <PlanCard {...args} />
        </Col>
      </StyledRow>
    </CardsContainer>
  );
};

const SingleTemplate: Story<PlanCardsProps> = (args) => {
  return <PlanCard {...args} />;
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
