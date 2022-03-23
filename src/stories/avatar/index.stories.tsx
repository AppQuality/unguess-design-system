import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../theme";
import { Avatar } from ".";
import { AvatarArgs } from "./_types";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";

const Template: Story<AvatarArgs> = (args) => {
  const getChildren = (type: any) => {
    switch (type) {
      case "icon":
        return <UserIcon role="img" aria-label="User" />;

      case "image":
        return "https://s3.eu-west-1.amazonaws.com/appq.static/rossini.png";

      default:
        return args.children;
    }
  };

  return <Avatar {...args} children={getChildren(args.avatarType)} />;
};

export const Default = Template.bind({});
Default.args = {
  avatarType: "text",
  children: "LC",
  backgroundColor: theme.gradients.dark,
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=3673%3A29791",
  },
};

export const Square = Template.bind({});
Square.args = {
  avatarType: "icon",
  isSystem: true,
  status: "available",
};

Square.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=3673%3A29824",
  },
};

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    badge: {
      control: {
        type: "text",
      },
    },
    avatarType: {
      control: {
        type: "select",
        options: ["icon", "image", "text"],
      },
    },
    children: {
      name: "Avatar text",
      description: "If AvatarType is `text` set the avatar content",
      control: "text",
    },
  },
} as ComponentMeta<typeof Avatar>;
