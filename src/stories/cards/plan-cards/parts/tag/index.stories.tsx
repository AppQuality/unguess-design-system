import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Col } from "../../../../grid/col";
import { Row } from "../../../../grid/row";
import { IPlanTagProps, PlanTag } from ".";

interface TagStoryProps extends IPlanTagProps {
  children: string;
}

const Template: Story<TagStoryProps> = ({ children, ...args }) => (
  <Row>
    <Col textAlign="center">
      <PlanTag status={args.status ?? "UnquotedDraft"} statusLabel={children} />
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  children: "Questo è un tag",
};

export default {
  title: "Atoms/Tag/PlanTag",
  component: PlanTag,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["UnquotedDraft", "Submitted", "AwaitingApproval", "Accepted", "Paying"],
      },
    },
  },
} as ComponentMeta<typeof PlanTag>;
