import { ComponentMeta, Story } from "@storybook/react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/123-fill.svg";
import { Button } from ".";
import { getButtonVariant } from "./_shared";
import { ButtonArgs } from "./_types";


const defaultArgs: ButtonArgs = {
  variant: "isBasic",
  isPill: false,
  size: "medium",
};

const Template: Story<ButtonArgs> = (args) => {
  const variant = getButtonVariant(args);
  return <Button {...args} {...variant} />;
};

const IconTemplate: Story<ButtonArgs> = (args) => {
  const variant = getButtonVariant(args);
  return (
    <Button {...args} {...variant}>
      <Button.StartIcon>
        <LeafIcon/>
      </Button.StartIcon>
    </Button>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  variant: "isBasic",
  isBasic: true,
  children: "button",
  onClick: () => alert("clicked!"),
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  variant: "isPrimary",
  children: "button",
  onClick: () => alert("clicked!"),
};

export const Media = IconTemplate.bind({});
Media.args = {
  ...defaultArgs,
  variant: "isDefault",
  children: 'button',
  onClick: () => alert("clicked!"),
};

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["isDefault", "isBasic", "isPrimary", "isLink"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
} as ComponentMeta<typeof Button>;
