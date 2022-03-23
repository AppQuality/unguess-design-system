import { CampaignCardsProps, Status, TestType } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { CampaignCard } from "./index"

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819"
}

const defaultArgs = {
  isNew: true,
  date: new Date().toDateString(),
  title: "Amazing title",
  subTitle: "This is a subtitle",
  status: Status.COMPLETED,
  testType: TestType.USABILITY_TEST
}

const Template: Story<CampaignCardsProps> = (props) => {
  return <CampaignCard { ...props }/>
}

export const Default = Template.bind({})
Template.args = {
  ...defaultArgs
}
Template.parameters = {
  design
}

export default {
  title: "Molecules/Card/CampaignCard",
  component: CampaignCard,
} as ComponentMeta<typeof CampaignCard>