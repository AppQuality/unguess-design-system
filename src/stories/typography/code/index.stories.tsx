import { ComponentMeta, Story } from "@storybook/react";
import { Code } from ".";
import { CodeArgs } from "./_types";

const Template: Story<CodeArgs> = (args) => <Code {...args} />;

const defaultArgs: CodeArgs = {
  children: "Equum cibum est optimum prandium est",
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Color = Template.bind({});
Color.args = {
  ...defaultArgs,
  hue: "red",
};

export const Size = Template.bind({});
Size.args = {
  ...defaultArgs,
  size: "large",
};

export default {
  title: "Atoms/Typography/Code",
  component: Code,
  argTypes: {
    hue: {
      control: {
        type: "select",
        options: ["grey", "red", "green", "yellow"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large", "inherit"],
      },
    },
    children: {
      name: "Code text",
      description: "The example code text",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Code>;
