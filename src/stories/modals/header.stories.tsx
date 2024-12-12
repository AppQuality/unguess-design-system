import { Meta } from "@storybook/react";
import { ComponentProps } from "react";
import { Modal } from ".";
import { Placeholder } from "../placeholder";

type Args = ComponentProps<typeof Modal.Header> & {};

const meta = {
  title: "Molecules/Modals/Header",
  component: Modal,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A124",
    },
  },
  render: (args) => {
    return (
      <Modal>
        <Modal.Header {...args}>
          {args.title ? args.title : <Placeholder />}
        </Modal.Header>
      </Modal>
    );
  },
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    isDanger: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    title: undefined,
    isDanger: false,
  },
} satisfies Meta<Args>;

export default meta;

export const Default = {
  args: {},
};

export const Danger = {
  args: {
    title: "Cool title",
    isDanger: true,
  },
};
