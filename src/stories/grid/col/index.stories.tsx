import { Meta, StoryFn } from "@storybook/react";
import { Col } from ".";
import { ColArgs } from "./_types";

const defaultArgs: ColArgs = {
  size: "4",
  children: "Column",
};

const Template: StoryFn<typeof Col> = (args) => <Col {...args} />;

export const Basic = Template.bind({});
Basic.args = defaultArgs;

export const Breaks = Template.bind({});
Breaks.args = {
  ...defaultArgs,
  sm: "12",
};

export const Offset = Template.bind({});
Offset.args = {
  ...defaultArgs,
  md: 4,
  offsetMd: 4,
};

export default {
  title: "Atoms/Grid/Col",
  component: Col,
  argTypes: {
    xs: {
      name: "Col xs",
      control: "number",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Col>;
