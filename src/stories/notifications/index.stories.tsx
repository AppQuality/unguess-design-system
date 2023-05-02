import { ComponentMeta, Story } from "@storybook/react";
import {
  Notification as UgNotification,
  ToastProvider as UgToastProvider,
  useToast,
} from ".";
import { Title } from "../title";
import { NotificationArgs, ToastProviderArgs } from "./_types";
import { useCallback } from "react";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { Button } from "../buttons/button";

interface NotificationStoryProps {
  notificationArgs: NotificationArgs;
  toastProviderArgs: ToastProviderArgs;
}

const defaultArgs: NotificationStoryProps = {
  notificationArgs: {
    type: "info",
    children: <Title isRegular>Action completed</Title>,
    onClose: () => alert("Close"),
  },
  toastProviderArgs: {
    limit: 5,
    zIndex: 1000,
    placementProps: {
      top: {
        style: {
          top: 60,
        },
      },
    },
  },
};

const Toasts = ({ children, onClose, ...props }: NotificationArgs) => {
  const { addToast } = useToast();

  const handleClick = useCallback(
    (
      placement:
        | "top-start"
        | "top"
        | "top-end"
        | "bottom-start"
        | "bottom"
        | "bottom-end"
    ) => {
      return () => {
        addToast(
          ({ close }) => (
            <UgNotification
              {...props}
              onClose={() => {
                onClose && onClose();
                close();
              }}
            >
              {children}
            </UgNotification>
          ),
          { placement }
        );
      };
    },
    [addToast, props, children, onClose]
  );

  return (
    <Grid>
      <Row>
        <Col size="4"></Col>
        <Col size="4">
          <Button onClick={handleClick("top")} isStretched>
            Show toast
          </Button>
        </Col>
        <Col size="4"></Col>
      </Row>
    </Grid>
  );
};

const Template: Story<NotificationStoryProps> = ({
  notificationArgs,
  toastProviderArgs,
}) => {
  return (
    <UgToastProvider {...toastProviderArgs}>
      <Toasts {...notificationArgs} />
    </UgToastProvider>
  );
};

export const ToastProvider = Template.bind({});
ToastProvider.args = defaultArgs;

const NotificationTemplate: Story<NotificationArgs> = ({
  children,
  onClose,
  ...props
}) => <UgNotification {...props}>{children}</UgNotification>;

export const Notification = NotificationTemplate.bind({});
Notification.args = defaultArgs.notificationArgs;

export default {
  title: "Molecules/Notification",
  component: UgNotification,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof UgNotification>;
