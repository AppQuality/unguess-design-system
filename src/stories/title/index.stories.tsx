import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Title } from ".";
import { TitleArgs } from "./_types";

const Template: Story<TitleArgs> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  isRegular: false,
  children: "Title is on the table",
};

export default {
  title: "Atoms/Title",
  component: Title,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Title>;
