import { Meta, StoryFn } from "@storybook/react";
import { Paragraph } from "@zendeskgarden/react-typography";
import { Ellipsis } from ".";
import { MD } from "../typescale";

const Template: StoryFn<any> = ({ width, ...args }) => {
  const widthStyle = width ? { width: `${width}px` } : {};
  return (
    <MD>
      <Paragraph {...args}>
        &lt;Paragraph&gt; Equum cibum est optimum prandium est
      </Paragraph>
      <Ellipsis style={widthStyle} {...args}>
        &lt;Ellipsis&gt; Equum cibum est optimum prandium est
      </Ellipsis>
    </MD>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: 265,
  children: "Eat horses, not humans",
};

export default {
  title: "Atoms/Typography/Ellipsis",
  component: Ellipsis,
  argTypes: {
    title: {
      description: "Overrides the auto-generated `title` attribute",
      control: "text",
    },
    children: {
      name: "Text",
      description: "The example text to be wrapped",
      control: "text",
    },
    width: {
      name: "Width",
      description: "Controls the element width",
      control: "number",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Ellipsis>;
