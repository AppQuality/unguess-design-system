import { ComponentMeta, Story } from "@storybook/react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { Button } from ".";
import { getButtonVariant } from "../utils/useButtonVariant";
import { ButtonArgs } from "./_types";

const defaultArgs: ButtonArgs = {
  variant: "isDefault",
  isPill: false,
  size: "medium",
  children: "button",
  onClick: () => alert("clicked!"),
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  isBasic: true,
  variant: "isBasic",
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  variant: "isPrimary",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...defaultArgs,
  hasStartIcon: true,
  hasEndIcon: false,
};
console.log("WithIcon", WithIcon)

const defaultStoryMeta: ComponentMeta<typeof Button> = {
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
    onClick: {
      table: {
        category: 'Events',
      },
    }
  },
}

export default {
  ...defaultStoryMeta,
  title: "Atoms/Buttons/Button",
};