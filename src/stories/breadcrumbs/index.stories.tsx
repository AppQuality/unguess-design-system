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
      children: "Nome lunghissimo della breadcrumb per provare l'ellipsis",
      onClick: () => {}
    },
  ],
  defaultValue: "",
};


Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A32401',
  },
};

export default {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumb,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Breadcrumb>;
