import { ComponentMeta, Story } from "@storybook/react";
import { Breadcrumb } from ".";
import { Anchor } from "../buttons/anchor";
import { Basic } from "../buttons/anchor/index.stories";
import { Span } from "@zendeskgarden/react-typography"; //TODO: replace with unguess component
import { BreadcrumbProps } from "./_types";


const Template: Story<BreadcrumbProps> = ({ children, defaultValue, ...args }) => {
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
  title: "Atoms/Breadcrumbs",
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;
