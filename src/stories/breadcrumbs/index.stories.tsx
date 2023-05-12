import { ComponentMeta, Story } from "@storybook/react";
import { IAnchorProps } from "@zendeskgarden/react-buttons";
import { Breadcrumb } from ".";
import { Anchor } from "../buttons/anchor";
import { Basic } from "../buttons/anchor/index.stories";
import { BreadcrumbArgs } from "./_types";
interface StoryArgs extends BreadcrumbArgs {
  items: IAnchorProps &
    {
      children: string;
      onClick: () => void;
    }[];
}

const Template: Story<StoryArgs> = ({ items, ...args }) => {
  return (
    <Breadcrumb {...args}>
      {items.map((item) => (
        <Anchor {...item} />
      ))}
    </Breadcrumb>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: [
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
  showLastArrow: true
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
