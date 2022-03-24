import { ComponentMeta, Story } from "@storybook/react";
import { Blockquote } from ".";
import { MD } from "../typescale";
import { Paragraph } from "../paragraph";

const Template: Story<any> = (args) => {
  return (
    <MD>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Paragraph>
      <Blockquote {...args} />
      <Paragraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
      <Blockquote {...args} />
      <Blockquote {...args} />
    </MD>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  children: "Eat horses, not humans",
};

export default {
  title: "Atoms/Typography/Blockquote",
  component: Blockquote,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    children: {
      name: "Blockquote text",
      description: "The example text of the blockquote",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Blockquote>;

