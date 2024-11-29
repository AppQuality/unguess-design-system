import type { Meta, StoryObj } from "@storybook/react";

import { ChatShortCut } from ".";

const meta = {
  title: "Organisms/Chat/Shorcuts",
  component: ChatShortCut,

  parameters: {
    layout: "centered",
  },
  args: {
    children: "Command description",
  },
} satisfies Meta<typeof ChatShortCut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bold: Story = {
  args: {
    type: "bold",
  },
};

export const Italic: Story = {
  args: {
    type: "italic",
    icon: "🎥",
  },
};

export const Mention: Story = {
  args: {
    type: "mention",
  },
};

export const Send: Story = {
  args: {
    type: "send",
  },
};
