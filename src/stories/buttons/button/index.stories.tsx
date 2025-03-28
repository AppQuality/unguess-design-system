import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ReactComponent as LeafIcon } from "../../../assets/icons/leaf-stroke.svg";

import { Button } from ".";

type Args = React.ComponentProps<typeof Button> & {
  withStartIcon?: boolean;
  withEndIcon?: boolean;
};

const meta = {
  title: "Atoms/Buttons/Button",
  component: Button,

  args: {
    children: "Button",
    onClick: fn(),
    disabled: false,
  },
  render: ({ withStartIcon, withEndIcon, ...args }) => {
    return (
      <Button {...args}>
        {withStartIcon && (
          <Button.StartIcon>
            <LeafIcon />
          </Button.StartIcon>
        )}
        {args.children}
        {withEndIcon && (
          <Button.EndIcon>
            <LeafIcon />
          </Button.EndIcon>
        )}
      </Button>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Primary: Story = {
  args: {
    isPrimary: true,
  },
};

export const DangerPrimary: Story = {
  args: {
    isPrimary: true,
    isDanger: true,
  },
};

export const AccentPrimary: Story = {
  args: {
    isPrimary: true,
    isAccent: true,
  },
};

export const Danger: Story = {
  args: {
    isDanger: true,
  },
};

export const Accent: Story = {
  args: {
    isAccent: true,
  },
};

export const Link: Story = {
  args: {
    isLink: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    withStartIcon: true,
  },
};

export const WithEndIcon: Story = {
  args: {
    withEndIcon: true,
  },
};
