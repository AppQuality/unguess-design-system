import { Meta, StoryFn } from "@storybook/react";
import { Paragraph } from ".";
import { MD } from "../typescale";
import { IParagraphProps } from "@zendeskgarden/react-typography";

const Template: StoryFn<IParagraphProps> = (args) => {
  return (
    <>
      <Paragraph {...args}>
        <MD>{args.children}</MD>
      </Paragraph>
      <Paragraph {...args}>
        <MD>{args.children}</MD>
      </Paragraph>
    </>
  );
};

const defaultArgs: IParagraphProps = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Atoms/Typography/Paragraph",
  component: Paragraph,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    children: {
      name: "Paragraph text",
      description: "The example text",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Paragraph>;
