import { ComponentMeta, Story } from "@storybook/react";
import { Tooltip } from "@zendeskgarden/react-tooltips";  //TODO: replace with unguess component
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { IconButton } from ".";
import { IconButtonArgs } from "./_types";

const defaultArgs: IconButtonArgs = {
  onClick: () => {
    alert("Clicked!");
  },
};

const Template: Story<IconButtonArgs> = (args) => {
  return (
    <Tooltip content="Tooltip content">
      <IconButton {...args}>
        <LeafIcon />
      </IconButton>
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  isDanger: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const Shape = Template.bind({});
Shape.args = {
  ...defaultArgs,
  isBasic: false,
  isPill: false,
};

export default {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
} as ComponentMeta<typeof IconButton>;
