import { ComponentMeta, Story } from "@storybook/react";
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
} as ComponentMeta<typeof Title>;
