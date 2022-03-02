import { ComponentMeta, Story } from "@storybook/react";
import { IButtonProps } from "@zendeskgarden/react-buttons";
import { Button } from ".";

interface IArgs extends IButtonProps {
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  isStartIconRotated?: boolean;
  isEndIconRotated?: boolean;
}

const defaultArgs: IArgs = {
  isBasic: false,
  isPrimary: false,
  isLink: false,
  isPill: false,
  size: "medium",
};

const Template: Story<IArgs> = (args) => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  isBasic: true,
  children: "button",
  onClick: () => alert("clicked!"),
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  isPrimary: true,
  children: "button",
  onClick: () => alert("clicked!"),
};


export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;