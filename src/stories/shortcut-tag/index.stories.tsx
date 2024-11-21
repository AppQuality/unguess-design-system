import type { Meta, StoryObj } from "@storybook/react";

import { ShortcutTag } from ".";

const meta = {
  title: "Atoms/ShortcutTag",
  component: ShortcutTag,

  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ShortcutTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Space",
  },
};

export const Ctrl: Story = {
  args: {
    ctrl: true,
  },
};
