import type { Meta, StoryObj } from "@storybook/react";
import { StatusRunningIcon } from "../icons";

import { Combobox, Field } from "@zendeskgarden/react-dropdowns.next";
import { SelectOption } from ".";

type Args = React.ComponentProps<typeof SelectOption> & {
  hasMeta?: boolean;
  hasIcon?: boolean;
  selected?: boolean;
  isCompact?: boolean;
};

const meta = {
  title: "Atoms/SelectOption",
  component: SelectOption,

  render: ({ hasMeta, hasIcon, ...args }) => {
    return (
      <Field>
        <Combobox
          isEditable={false}
          isExpanded={true}
          isCompact={args.isCompact}
          selectionValue={args.selected ? args.value : undefined}
        >
          <SelectOption
            {...args}
            meta={hasMeta ? "Daisy" : undefined}
            icon={hasIcon ? <StatusRunningIcon /> : undefined}
          />
        </Combobox>
      </Field>
    );
  },
  args: {
    value: "acacia",
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
  },
};

export const WithMeta: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    hasMeta: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    isDisabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    hasIcon: true,
  },
};

export const Selected: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    selected: true,
  },
};
export const SelectedWithIcon: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    hasIcon: true,
    selected: true,
  },
};

export const Compact: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    isCompact: true,
  },
};

export const Danger: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    type: "danger",
  },
};
