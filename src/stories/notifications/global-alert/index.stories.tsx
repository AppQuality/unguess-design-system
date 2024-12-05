import type { Meta, StoryObj } from "@storybook/react";

import { GlobalAlert } from ".";
import { Placeholder } from "../../placeholder";

type Args = React.ComponentProps<typeof GlobalAlert> & {
  messageContent?: "accountupdate" | "placeholder";
};

const meta = {
  title: "Molecules/Notification/GlobalAlert",
  component: GlobalAlert,

  render: ({ messageContent, ...args }) => {
    const message =
      messageContent === "accountupdate" ? (
        <>
          Your account will automatically update in 5 days.{" "}
          <a href="#" target="_blank">
            Find out more
          </a>
        </>
      ) : (
        <Placeholder />
      );
    return <GlobalAlert {...args} message={message} />;
  },

  args: {
    type: "info",
    title: "Account update",
    dismissable: true,
    onClose: () => {
      alert("dismissed");
    },
    cta: {
      label: "Find out more",
      onClick: () => {
        alert("clicked");
      },
    },
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountUpdate: Story = {
  args: {
    messageContent: "accountupdate",
  },
};

export const Generic: Story = {
  args: {},
};
