import type { Meta, StoryObj } from "@storybook/react";

import { PlayerShortCut } from ".";

const meta = {
  title: "Organisms/Player/Shorcuts",
  component: PlayerShortCut,

  parameters: {
    layout: "centered",
  },
  args: {
    children: "Command description",
  },
} satisfies Meta<typeof PlayerShortCut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayPause: Story = {
  args: {
    type: "play/pause",
  },
};

export const WithIcon: Story = {
  args: {
    type: "play/pause",
    icon: "🎥",
  },
};

export const Mute: Story = {
  args: {
    type: "mute",
  },
};

export const Backward: Story = {
  args: {
    type: "backward",
  },
};

export const Forward: Story = {
  args: {
    type: "forward",
  },
};

export const Observation: Story = {
  args: {
    type: "observation",
  },
};
