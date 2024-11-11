import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import {
  GlobalAlert as UgGlobalAlert,
  GlobalAlertProps
} from ".";
import { Anchor } from "../../buttons/anchor";

const GlobalAlertTemplate: Story<GlobalAlertProps> = ({ ...props }) => (
  <UgGlobalAlert {...props}>
    <UgGlobalAlert.Content>
      <UgGlobalAlert.Title>New update available</UgGlobalAlert.Title>
      Your account will automatically update in 5 days.{' '}
      <Anchor href="#" isExternal>
        Find out more
      </Anchor>
    </UgGlobalAlert.Content>
    <UgGlobalAlert.Button>Update now</UgGlobalAlert.Button>
    <UgGlobalAlert.Close aria-label="Close Global Alert" />
  </UgGlobalAlert>
);

export const GlobalAlert = GlobalAlertTemplate.bind({});
GlobalAlert.args = {
  type: "info"
};

export default {
  title: "Molecules/Notification",
  component: UgGlobalAlert,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof UgGlobalAlert>;
