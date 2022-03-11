import { ComponentMeta, Story } from "@storybook/react";
import { Breadcrumb } from ".";
import { Anchor } from "../buttons/anchor";
import { Basic } from "../buttons/anchor/index.stories";
import { Span } from "../typography/span";
import { BreadcrumbArgs } from "./_types";


const Template: Story<BreadcrumbArgs> = ({ children, defaultValue, ...args }) => {
  return (
    <Breadcrumb {...args}>
      {children.map((item) => (
        <Anchor {...item} />
      ))}
      <Span>{defaultValue}</Span>
    </Breadcrumb>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: [
    {
      ...Basic.args,
      children: "Home",
      onClick: () => {}
    },
    {
      ...Basic.args,
      children: "Dashboards",
      onClick: () => {}
    },
  ],
  defaultValue: "Functional Dashboard",
};


export default {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;
