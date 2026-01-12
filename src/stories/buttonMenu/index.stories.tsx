import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/overflow-vertical-fill.svg";
import React from "react";
import { ButtonMenu } from ".";
import { IconButton } from "../buttons/icon-button";

type Args = React.ComponentProps<typeof ButtonMenu>;

const meta: Meta<Args> = {
  title: "Molecules/ButtonMenu",
  component: ButtonMenu,
  args: {
    onSelect: fn(),
    children: undefined,
  },
  render: (args) => {
    return (
      <ButtonMenu {...args}>
        <ButtonMenu.Item value="1">Item 1</ButtonMenu.Item>
        <ButtonMenu.Item value="2">Item 2</ButtonMenu.Item>
        <ButtonMenu.Item type="danger" value="3">
          Item 3
        </ButtonMenu.Item>
      </ButtonMenu>
    );
  },
};

export default meta;
type Story = StoryObj<typeof ButtonMenu>;

export const Default: Story = {
  args: {
    label: "Menu",
  },
};

export const WithIcon: Story = {
  args: {
    label: (props) => (
      <IconButton {...props}>
        <LeafIcon />
      </IconButton>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<ButtonMenu label={(props) => (
  <IconButton {...props}>
    <LeafIcon />
  </IconButton>
)}>
  <ButtonMenu.Item value="1">Item 1</ButtonMenu.Item>
  <ButtonMenu.Item value="2">Item 2</ButtonMenu.Item>
  <ButtonMenu.Item type="danger" value="3">
    Item 3
  </ButtonMenu.Item>
</ButtonMenu>`,
      },
    },
  },
};

export const Danger: Story = {
  args: {
    label: "Menu",

    buttonProps: {
      isDanger: true,
    },
  },
};
