import { ComponentMeta, Story } from "@storybook/react";
import { Notification, Title, Close } from ".";
import { NotificationArgs } from "./_types";

interface NotificationStoryProps extends NotificationArgs {
  title: string;
  content: string;
}

const Template: Story<NotificationStoryProps> = ({
  title,
  content,
  ...args
}) => {
  return (
    <Notification {...args}>
      <Title>{title}</Title>
      {content}
      <Close aria-label="Close Notification" />
    </Notification>
  );
};

const defaultArgs: NotificationStoryProps = {
  type: "info",
  title: "Info",
  content:
    "L'arancino siciliano comparve molto tardi nei ricettari che oggi conosciamo: nel XIX secolo.",
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Atoms/Notification",
  component: Notification,
} as ComponentMeta<typeof Notification>;
