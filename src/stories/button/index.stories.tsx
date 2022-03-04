import { ComponentMeta, Story } from "@storybook/react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { Button } from ".";
import { getButtonVariant } from "./_shared";
import { ButtonArgs } from "./_types";

const defaultArgs: ButtonArgs = {
  variant: "isBasic",
  isPill: false,
  size: "medium",
};

const Template: Story<ButtonArgs> = ({
  hasStartIcon,
  hasEndIcon,
  isStartIconRotated,
  isEndIconRotated,
  ...args
}) => {
  const variant = getButtonVariant(args);
  return (
    <Button {...args} {...variant}>
      {hasStartIcon && (
        <Button.StartIcon isRotated={isStartIconRotated}>
          <LeafIcon />
        </Button.StartIcon>
      )}
      {args.children}
      {hasEndIcon && (
        <Button.EndIcon isRotated={isEndIconRotated}>
          <ChevronIcon />
        </Button.EndIcon>
      )}
    </Button>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  variant: "isBasic",
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

export const Media = Template.bind({});
Media.args = {
  ...defaultArgs,
  variant: "isDefault",
  children: "button",
  hasStartIcon: true,
  hasEndIcon: false,
  onClick: () => alert("clicked!"),
};

export default {
  title: "Button",
  component: Button,
  subcomponents: {
    "Button.StartIcon": Button.StartIcon,
    "Button.EndIcon": Button.EndIcon,
  },
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
