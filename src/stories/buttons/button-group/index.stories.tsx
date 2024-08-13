import { Meta, StoryFn } from "@storybook/react";
import { ButtonGroup } from ".";
import { Button } from "../button";
import { Default, Basic } from "../button/index.stories";
import { IButtonGroupProps } from "@zendeskgarden/react-buttons";

const Template: StoryFn<IButtonGroupProps & { items: any[] }> = ({
  items,
  ...args
}) => {
  return (
    <ButtonGroup {...args}>
      {items.map((item) => (
        <Button {...item} />
      ))}
    </ButtonGroup>
  );
};

export const TwoItems = Template.bind({});

TwoItems.args = {
  items: [
    {
      ...Basic.args,
      children: "Item 1",
      value: "item-1",
      onClick: () => {},
    },
    {
      ...Basic.args,
      children: "Item 2",
      value: "item-2",
      onClick: () => {},
    },
  ],
};

export const WithBorders = Template.bind({});
WithBorders.args = {
  items: [
    {
      ...Default.args,
      children: "Item 1",
      value: "item-1",
      onClick: () => {},
    },
    {
      ...Default.args,
      children: "Item 2",
      value: "item-2",
      onClick: () => {},
    },
  ],
};

export const RoundedItems = Template.bind({});
RoundedItems.args = {
  items: [
    {
      ...Basic.args,
      children: "Item 1",
      value: "item-1",
      isPill: true,
      onClick: () => {},
    },
    {
      ...Basic.args,
      children: "Item 2",
      value: "item-2",
      isPill: true,
      onClick: () => {},
    },
    {
      ...Basic.args,
      children: "Item 3",
      value: "item-3",
      isPill: true,
      onClick: () => {},
    },
  ],
};

export default {
  title: "Atoms/Buttons/ButtonGroup",
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;
