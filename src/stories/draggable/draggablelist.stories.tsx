import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Draggable, DraggableList } from ".";

type Args = React.ComponentProps<typeof DraggableList> & {};

const meta = {
  title: "Atoms/Draggable/DraggableList",
  component: DraggableList,

  args: {
    onClick: fn(),
  },
  argTypes: {},
  render: ({ ...args }) => {
    return (
      <DraggableList {...args}>
        <DraggableList.Item>
          <Draggable>Item 1</Draggable>
        </DraggableList.Item>
        <DraggableList.Item>
          <Draggable>Item 2</Draggable>
        </DraggableList.Item>
      </DraggableList>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
