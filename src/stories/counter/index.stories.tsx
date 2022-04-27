import { ComponentMeta, Story } from "@storybook/react";
import { Counter } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { CounterArgs } from "./_types";

interface TagStoryProps extends CounterArgs {
  hasAvatar: boolean;
}

const Template: Story<TagStoryProps> = ({hasAvatar, ...args}) => (
  <Row>
    <Col textAlign="center">
      <Counter {...args} />
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  children: "Completed",
  status: "completed",
  hasAvatar: true
};

// export const Avatar = Template.bind({});
// Avatar.args = {
//   title: "Tag con avatar",
//   hasAvatar: true
// };

// export const Close = Template.bind({});
// Close.args = {
//   title: "Tag rimovibile",
//   canBeClosed: true
// };

export default {
  title: "Atoms/Counter",
  component: Counter,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Counter>;
