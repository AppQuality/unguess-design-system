import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { AppHeader } from ".";
import { ReactComponent as ChangelogIcon } from "../../../assets/icons/megaphone-stroke.svg";
import { Default as DefaultAvatar } from "../../avatar/index.stories";
import { AppHeaderArgs } from "./_types";

const Template: Story<AppHeaderArgs> = (args) => <AppHeader {...args} />;

const defaultArgs = {
  isStandalone: true,
  hasChangelog: true,
  changelogItem: <ChangelogIcon onClick={() => alert("Changelog clicked")} />,
  brand: {
    brandName: "Enel's Workspace",
    menuLabel: "menu",
    activeWorkspace: {
      company: "Enel",
      id: 1,
    },
    workspaces: [
      {
        company: "Enel",
        id: 1,
      },
    ],
    onClick: () => {
      alert("Logo clicked");
    },
  },
  avatar: {
    ...DefaultAvatar.args,
    children: "LC",
  },
  onProfileModalToggle: () => {
    alert("Triggered profile modal");
  },
  isLoading: false,
  onSidebarMenuToggle: () => {
    alert("Triggered sidebar menu");
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const MultipleWorkspaces = Template.bind({});
MultipleWorkspaces.args = {
  ...defaultArgs,
  brand: {
    ...defaultArgs.brand,
    activeWorkspace: {
      company: "Enel",
      id: 1,
    },
    workspaces: [
      {
        company: "Enel",
        id: 1,
      },
      {
        company: "Amazon",
        id: 2,
      },
    ],
  },
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=3673%3A29791",
  },
};

export default {
  title: "Organisms/Header",
  component: AppHeader,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof AppHeader>;
