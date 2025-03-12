import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Draggable } from ".";

type Args = React.ComponentProps<typeof Draggable> & {
  withDragHandle?: boolean;
};

const meta = {
  title: "Atoms/Draggable",
  component: Draggable,

  args: {
    children: "Drag Me",
    onClick: fn(),
  },
  argTypes: {
    withDragHandle: {
      control: "boolean",
    },
  },
  render: ({ children, withDragHandle, ...args }) => {
    return (
      <Draggable {...args}>
        {withDragHandle ? <Draggable.Grip /> : null}
        {children}
      </Draggable>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const withDragHandle: Story = {
  args: {
    withDragHandle: true,
  },
};
