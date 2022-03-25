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
  type: 'REGRESSION',
}

const MultiTemplate: Story<CampaignCardsProps> = (args) => {
  return <Row>
    <Col><CampaignCard {...args} type={"FUNCTIONAL"} date={new Date().toLocaleString().substring(0, 10)} status={"INCOMING"} /></Col>
    <Col><CampaignCard {...args} isNew={false} status={"PROGRESS"} /></Col>
    <Col><CampaignCard {...args} isNew={false} type={"FUNCTIONAL"} /></Col>
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
} as ComponentMeta<typeof CampaignCard>
