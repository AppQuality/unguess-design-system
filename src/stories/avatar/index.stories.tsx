import { ComponentMeta, Story } from "@storybook/react";
import { theme } from '../theme';
import { Avatar } from ".";
import { AvatarArgs } from "./_types";
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';

interface AvatarProps extends AvatarArgs {
  type: 'icon' | 'image' | 'text';
}

const Template: Story<AvatarProps> = (args) => {
  const children = (type: string) => {
    if (type === "icon") return <UserIcon role="img" aria-label="User" />
    if (type === "image") return <img alt="avatar" src="https://s3.eu-west-1.amazonaws.com/appq.static/rossini.png" />
    if (type === "text") return <Avatar.Text>LC</Avatar.Text>
  }
  return (
    <Avatar {...args}>
      {children(args.type)}
    </Avatar>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "text",
  backgroundColor: theme.colors.primaryHue,
};

export const Square = Template.bind({});
Square.args = {
  type: "icon",
  backgroundColor: theme.colors.primaryHue,
  isSystem: true,
  status: "available"
};

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    badge: {
      control: {
        type: "text"
      }
    },
    type: {
      control: {
        type: "select",
        options: ['icon', 'image', 'text']
      }
    }
  }
} as ComponentMeta<typeof Avatar>;
