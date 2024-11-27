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
            icon={hasIcon ? <StatusRunningIcon /> : undefined}
          >
            Acacia
            {hasMeta && <SelectOption.Meta>Daisy</SelectOption.Meta>}
          </SelectOption>
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
  args: {},
};

export const WithMeta: Story = {
  args: {
    hasMeta: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    hasIcon: true,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
export const SelectedWithIcon: Story = {
  args: {
    selected: true,
    hasIcon: true,
  },
};

export const Compact: Story = {
  args: {
    isCompact: true,
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
  },
};
