import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { ButtonMenu } from ".";
import { ButtonMenuProps } from "./_types";

const Template: Story<ButtonMenuProps> = (props) => {
  return (
    <ButtonMenu {...props}>
      <ButtonMenu.Item value="cactus">Cactus</ButtonMenu.Item>
      <ButtonMenu.Item value="jade">Jade plant</ButtonMenu.Item>
      <ButtonMenu.Item value="echeveria">Echeveria</ButtonMenu.Item>
    </ButtonMenu>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Menu",
  onSelect: (value) => {
    alert("Clicked " + value);
  },
};

export default {
  title: "Molecules/ButtonMenu",
  component: ButtonMenu,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof ButtonMenu>;
