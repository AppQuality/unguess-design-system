import { ComponentMeta, Story } from "@storybook/react";
import { ButtonGroup } from ".";
import { Button } from "../button";
import { Default, Basic } from "../button/index.stories";
import { ButtonGroupArgs } from "./_types";

interface ButtonGroupProps extends ButtonGroupArgs {
  items: any[],
}

const defaultArgs: ButtonGroupProps = {
  items: [],
  onSelect: (e) => {
    console.log("Item selected:", e);
  },
};

const Template: Story<ButtonGroupProps> = ({ items, ...args }) => {
  return (
    <ButtonGroup {...args}>
      {items.map((item) => (
        <Button {...item} />
      ))}
    </ButtonGroup>
  );
};

export const TwoItems = Template.bind({});

console.log("Basic args:", Basic.args);

TwoItems.args = {
  ...defaultArgs,
  items: [
    {
      ...Basic.args,
      children: "Item 1",
      value: "item-1",
      onClick: () => {}
    },
    {
      ...Basic.args,
      children: "Item 2",
      value: "item-2",
      onClick: () => {}
    },
  ]
};

export const WithBorders = Template.bind({});
WithBorders.args = {
  ...defaultArgs,
  items: [
    {
      ...Default.args,
      children: "Item 1",
      value: "item-1",
      onClick: () => {}
    },
    {
      ...Default.args,
      children: "Item 2",
      value: "item-2",
      onClick: () => {}
    },
  ]
};

export const RoundedItems = Template.bind({});
RoundedItems.args = {
  ...defaultArgs,
  items: [
    {
      ...Basic.args,
      children: "Item 1",
      value: "item-1",
      isPill: true,
      onClick: () => {}
    },
    {
      ...Basic.args,
      children: "Item 2",
      value: "item-2",
      isPill: true,
      onClick: () => {}
    },
    {
      ...Basic.args,
      children: "Item 3",
      value: "item-3",
      isPill: true,
      onClick: () => {}
    }
  ]

};


export default {
  title: "Atoms/Buttons/ButtonGroup",
  component: ButtonGroup

} as ComponentMeta<typeof ButtonGroup>;
