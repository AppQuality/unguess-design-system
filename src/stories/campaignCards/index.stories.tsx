import { CampaignCardsProps } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { CampaignCard } from "./index"
import { Col } from "../grid/col";
import { Row } from "../grid/row";

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819"
}

const defaultArgs: CampaignCardsProps = {
  isNew: true,
  date: "24/04/2022",
  title: "Amazing title",
  subTitle: "This is a subtitle",
  status: 'COMPLETED',
  type: 'EXPERIENTIAL',
  pillText: 'Experiential Test'
}

const MultiTemplate: Story<CampaignCardsProps> = (args) => {
  return <Row>
    <Col><CampaignCard {...args} title={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"} subTitle={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"} type={"FUNCTIONAL"} date={"20/10/2022"} status={"INCOMING"} /></Col>
    <Col><CampaignCard {...args} isNew={false} status={"PROGRESS"} /></Col>
    <Col><CampaignCard {...args} isNew={false} type={"FUNCTIONAL"} pillText={"Funcional Test"} /></Col>
    <Col><CampaignCard {...args} isNew={false} /></Col>
  </Row>
}

const SingleTemplate: Story<CampaignCardsProps> = (args) => {
  return <CampaignCard {...args} />
}

export const SingleCard = SingleTemplate.bind({})
SingleCard.args = {
  ...defaultArgs
}

export const Grid = MultiTemplate.bind({})
Grid.args = {
  ...defaultArgs
}

Grid.parameters = {
  design
}

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
} as ComponentMeta<typeof CampaignCard>
