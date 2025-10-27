import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as DeleteIcon } from "@zendeskgarden/svg-icons/src/12/trash-stroke.svg";
import { StatusRunningIcon } from "../icons";
import { Button } from "@zendeskgarden/react-buttons";
import { Combobox, Field } from "@zendeskgarden/react-dropdowns.next";
import { SelectOption } from ".";
import { Input } from "../forms/input";

type Args = React.ComponentProps<typeof SelectOption> & {
  hasMeta?: boolean;
  hasIcon?: boolean;
  hasActions?: boolean;
  selected?: boolean;
  isCompact?: boolean;
};

const meta = {
  title: "Atoms/SelectOption",
  component: SelectOption,

  render: ({ hasMeta, hasIcon, hasActions, ...args }) => {
    return (
      <Field>
        <Combobox
          isEditable={false}
          isExpanded={true}
          isCompact={args.isCompact}
          selectionValue={args.selected ? args.value : undefined}
        >
          <SelectOption
            id="select-an-option"
            label="Select or create an option"
            value=""
            actionIcon={hasIcon ? <DeleteIcon /> : undefined}
            actions={
              hasActions
                ? ({ closeModal }) => (
                    <Button
                      type="button"
                      isDanger
                      onClick={(e) => {
                        alert("delete item");
                        if (closeModal) closeModal();
                      }}
                    >
                      Delete
                    </Button>
                  )
                : undefined
            }
          />
          <SelectOption
            {...args}
            actions={
              hasActions
                ? ({ closeModal }) => (
                    <>
                      <label htmlFor="title-input">pippo</label>
                      <Input
                        type="text"
                        id="title-input"
                        onKeyDown={(e) => {
                          // if is enter save and close the modal
                          if (e.key === "Enter") {
                            alert("blur input");
                            e.currentTarget.blur();
                            if (closeModal) closeModal();
                          }
                        }}
                        onClick={(e) => {
                          e.currentTarget.focus();
                        }}
                      />
                      <Button
                        type="button"
                        isDanger
                        onClick={(e) => {
                          alert("delete item");
                          if (closeModal) closeModal();
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )
                : undefined
            }
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

export const WithActions: Story = {
  args: {
    id: "acacia",
    label: "Acacia",
    hasActions: true,
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
