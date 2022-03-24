import { CampaignCardsProps } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { CampaignCard } from "./index"
import { Col } from "../grid/col";
import { Row } from "../grid/row";

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819"
}

const defaultArgs = {
  isNew: true,
  date: "24/04/2022",
  title: "Amazing title",
  subTitle: "This is a subtitle",
  status: 'COMPLETED',
  type: 'REGRESSION',
}

const MultiTemplate: Story<CampaignCardsProps> = (args) => {
  return <Row>
    <Col><CampaignCard { ...args }/></Col>
    <Col><CampaignCard { ...args }/></Col>
    <Col><CampaignCard { ...args }/></Col>
    <Col><CampaignCard { ...args }/></Col>
  </Row>
}

const SingleTemplate: Story<CampaignCardsProps> = (args) => {
  return <CampaignCard { ...args }/>
}
export const DefaultSingle = SingleTemplate.bind({})
DefaultSingle.args = {
  ...defaultArgs
}


export const Default = MultiTemplate.bind({})
Default.args = {
  ...defaultArgs
}

export const NotNew = MultiTemplate.bind({})
NotNew.args = {
  ...defaultArgs,
  isNew: false
}

export const OnGoing = MultiTemplate.bind({})
OnGoing.args = {
  ...defaultArgs,
  status: 'ON_GOING',
  type: 'FUNCTIONAL',
  isNew: false
}
export const Today = MultiTemplate.bind({})
Today.args = {
  ...defaultArgs,
  status: 'ARRIVING',
  type: 'FUNCTIONAL',
  date: new Date().toLocaleString().substring(0,10)
}




Default.parameters = {
  design
}

export default {
  title: "Molecules/Card/CampaignCard",
  component: CampaignCard,
} as ComponentMeta<typeof CampaignCard>
