import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import {
  GlobalAlert as UgGlobalAlert,
  GlobalAlertProps
} from ".";
import { Anchor } from "../../buttons/anchor";

const GlobalAlertTemplate: Story<GlobalAlertProps> = ({ ...props }) => (
  <UgGlobalAlert {...props}>
  </UgGlobalAlert>
);

export const GlobalAlert = GlobalAlertTemplate.bind({});
GlobalAlert.args = {
  type: "info",
  title: "Account update",
  dismissable: true,
  onClose: () => {alert('dismissed')},
  cta: "Find out more",
  message: <>
    Your account will automatically update in 5 days.{' '}
    <Anchor href="#" isExternal>
      Find out more
    </Anchor>
  </>
};

export default {
  title: "Molecules/Notification",
  component: UgGlobalAlert,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof UgGlobalAlert>;
