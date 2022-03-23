import { ComponentMeta, Story } from "@storybook/react";
import { AppHeader } from ".";
import { AppHeaderArgs } from "./_types";
import { Default as DefaultAvatar } from "../../avatar/index.stories";

const Template: Story<AppHeaderArgs> = (args) => <AppHeader {...args} />;

const defaultArgs = {
  isStandalone: true,
  hasChangelog: true,
  onChangelogClick: () => {
    alert("clicked changelog");
  },
  brand: {
    brandName: "Enel's Workspace",
    menuLabel: "menu",
  },
  avatar: {
    ...DefaultAvatar.args,
    children: "LC",
    onProfileModalToggle: () => {
      alert("Triggered profile modal");
    },
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=3673%3A29791",
  },
};

export default {
  title: "Organisms/Header",
  component: AppHeader,
} as ComponentMeta<typeof AppHeader>;
