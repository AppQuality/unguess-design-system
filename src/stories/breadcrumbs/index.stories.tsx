import { ComponentMeta, Story } from "@storybook/react";
import { Breadcrumb } from ".";
import { Anchor } from "../buttons/anchor";
import { Basic } from "../buttons/anchor/index.stories";
import { Span } from "@zendeskgarden/react-typography"; //TODO: replace with unguess component
import { BreadcrumbProps } from "./_types";


const Template: Story<BreadcrumbProps> = ({ items, currentItem, ...args }) => {
  return (
    <Breadcrumb {...args}>
      {items.map((item) => (
        <Anchor {...item} />
      ))}
      <Span>{currentItem}</Span>
    </Breadcrumb>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      ...Basic.args,
      children: "Item 1",
      onClick: () => {}
    },
    {
      ...Basic.args,
      children: "Item 2",
      onClick: () => {}
    },
  ],
  currentItem: "Current Item",
};


export default {
  title: "Atoms/Breadcrumbs",
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;
