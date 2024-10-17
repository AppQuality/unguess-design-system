import { Meta, StoryFn } from "@storybook/react";
import { DotsMenu } from ".";
import { IDotsMenu } from "./_types";

const Template: StoryFn<IDotsMenu> = ({ children, ...props }) => (
  <DotsMenu {...props}>
    <DotsMenu.Item value="acacia">Acacia</DotsMenu.Item>
    <DotsMenu.Item value="daisy">Daisy</DotsMenu.Item>
    <DotsMenu.Item value="honeysuckle">Honeysuckle</DotsMenu.Item>
  </DotsMenu>
);

export const Default = Template.bind({});
Default.args = {
  onSelect: (value) => {
    alert("Clicked " + value);
  },
};

export default {
  title: "Atoms/DotsMenu",
  component: DotsMenu,
} as Meta<typeof DotsMenu>;
