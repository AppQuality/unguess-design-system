import { ComponentMeta, Story } from "@storybook/react";
import { Notification } from ".";
import { Title } from "../title";
import { Close } from "../close";
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
      <Close aria-label="Close Notification" onClick={() => alert("Closed!")}/>
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
  title: "Molecules/Notification",
  component: Notification,
} as ComponentMeta<typeof Notification>;
