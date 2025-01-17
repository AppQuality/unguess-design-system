import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";
import { Label } from "../../label";
import { FormField as Field } from "../field";

type Args = React.ComponentProps<typeof Checkbox> & {
  withLabel?: boolean;
};

const meta = {
  title: "Molecules/Forms/Checkbox",
  component: Checkbox,
  args: {
  },
  argTypes: {
    checked: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <Field>
        <Story />
      </Field>
    ),
  ],
  render: ({ withLabel, ...args }) => {
    return (
      <Checkbox {...args}>
        {withLabel ? <Label isRegular={true}>Questa è una Label accanto la Checkbox</Label>
        : <Label hidden style={{ height: "16px" }}>Questa è una Label nascosta</Label>}
      </Checkbox>
    );
  }
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    withLabel: true,
  },
};
