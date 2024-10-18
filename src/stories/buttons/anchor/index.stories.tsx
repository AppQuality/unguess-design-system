import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { IAnchorProps } from "@zendeskgarden/react-buttons";
import { Anchor } from ".";

const defaultArgs: IAnchorProps = {
  isDanger: false,
  isExternal: false,
  children: "Leave without watering",
};

const Template: Story<IAnchorProps> = (args) => <Anchor {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  onClick: () => alert("clicked!"),
};

Basic.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=538%3A26532",
  },
};

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  isDanger: true,
  onClick: () => alert("clicked!"),
};

Danger.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=538%3A26537",
  },
};

export const External = Template.bind({});
External.args = {
  ...defaultArgs,
  isExternal: true,
  onClick: () => alert("clicked!"),
};

export default {
  title: "Atoms/Buttons/Anchor",
  component: Anchor,
  argTypes: {
    children: {
      name: "Anchor text",
      description: "The example text of anchor button",
      control: "text",
    },
  },
} as ComponentMeta<typeof Anchor>;
