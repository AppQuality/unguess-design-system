// import { ComponentMeta, Story } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as LeafIcon } from "../../../assets/icons/leaf-stroke.svg";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { Button } from ".";
import { getButtonVariant } from "../utils/useButtonVariant";
import { ButtonArgs } from "./_types";

const defaultArgs: ButtonArgs = {
  variant: "isDefault",
  isPill: true,
  size: "medium",
  children: "button",
  disabled: false,
  onClick: () => alert("clicked!"),
};

type Story = StoryObj<ButtonArgs>;

const Template: Story = {
  args: defaultArgs,
  render: (args) => {
    const variant = getButtonVariant(args);
    return (
      <Button {...args} {...variant}>
        {args.hasStartIcon && (
          <Button.StartIcon isRotated={args.isStartIconRotated}>
            <LeafIcon />
          </Button.StartIcon>
        )}
        {args.children}
        {args.hasEndIcon && (
          <Button.EndIcon isRotated={args.isEndIconRotated}>
            <ChevronIcon />
          </Button.EndIcon>
        )}
      </Button>
    );
  },
};

export const Default = { ...Template };
Default.args = {
  ...defaultArgs,
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9271",
  },
};

export const Basic =  { ...Template };
Basic.args = {
  ...defaultArgs,
  isBasic: true,
  variant: "isBasic",
};

Basic.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9341",
  },
};

export const Primary = { ...Template };
Primary.args = {
  ...defaultArgs,
  variant: "isPrimary",
};

Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9410",
  },
};

export const WithIcon =  { ...Template };
WithIcon.args = {
  ...defaultArgs,
  hasStartIcon: true,
  hasEndIcon: false,
};

export default {
  title: "Atoms/Buttons/Button",
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
        category: "Events",
      },
    },
    children: {
      name: "Button text",
      description: "The example text of button",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Button>;
