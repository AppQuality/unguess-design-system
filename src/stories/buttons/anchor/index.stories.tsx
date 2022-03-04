import { ComponentMeta, Story } from "@storybook/react";
import { Anchor } from ".";
import { AnchorArgs } from "./_types";

const defaultArgs: AnchorArgs = {
  isDanger: false,
  isExternal: false,
  children: "Leave without watering",
};

const Template: Story<AnchorArgs> = (args) => <Anchor {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  onClick: () => alert("clicked!"),
};

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  isDanger: true,
  onClick: () => alert("clicked!"),
};

export const External = Template.bind({});
External.args = {
  ...defaultArgs,
  isExternal: true,
  onClick: () => alert("clicked!"),
};

export default {
  title: "Atoms/Buttons/Anchor",
  component: Anchor,
} as ComponentMeta<typeof Anchor>;
