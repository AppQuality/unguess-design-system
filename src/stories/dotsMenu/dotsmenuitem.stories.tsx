import type { Meta, StoryObj } from "@storybook/react";
import { StatusRunningIcon } from "../icons";

import { DotsMenu } from ".";

type Args = React.ComponentProps<typeof DotsMenu.Item> & {
  contentType?: string;
};

const meta = {
  title: "Atoms/DotsMenuItem",
  component: DotsMenu.Item,

  parameters: {
    docs: {
      description: {
        component: "Available only inside a `DotsMenu` component.",
      },
    },
  },
  argTypes: {
    contentType: {
      options: ["simple", "withMeta"],
      control: {
        type: "select",
      },
    },
  },

  decorators: [
    (Story) => (
      <DotsMenu isExpanded={true}>
        <Story />
      </DotsMenu>
    ),
  ],

  render: ({ contentType, ...args }) => {
    return (
      <DotsMenu.Item {...args}>
        {contentType === "simple" && "Acacia"}
        {contentType === "withMeta" && (
          <>
            Acacia
            <DotsMenu.Item.Meta>Daisy</DotsMenu.Item.Meta>
          </>
        )}
      </DotsMenu.Item>
    );
  },
  args: {
    contentType: "simple",
    value: "acacia",
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithMeta: Story = {
  args: {
    contentType: "withMeta",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <StatusRunningIcon />,
  },
};
