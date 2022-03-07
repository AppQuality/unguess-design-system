import { ComponentMeta, Story } from "@storybook/react";
import { Paragraph, MD } from ".";
import { ParagraphArgs } from "./_types";

const Template: Story<ParagraphArgs> = (args) => {
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

const defaultArgs: ParagraphArgs = {
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
  },
} as ComponentMeta<typeof Paragraph>;
