import type { Meta } from "@storybook/react";

import { Placeholder } from ".";

type Args = React.ComponentProps<typeof Placeholder> & {};

const meta = {
  title: "Utils/Placeholder",
  component: Placeholder,

  args: {},
} satisfies Meta<Args>;

export default meta;

export const Default = {
  args: {},
};
