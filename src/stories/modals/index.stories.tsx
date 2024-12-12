import { Meta } from "@storybook/react";
import { FooterItem, Modal } from ".";
import { Button } from "../buttons/button";
import { Placeholder } from "../placeholder";
import { ModalArgs } from "./_types";

interface ModalStoryArgs extends ModalArgs {
  content?: string | any;
  title?: string;
  footer?: string;
}
const longContent =
  "The tang of the untainted, fresh and free sea air was like a cool, " +
  "quieting thought, and the shells and pebbles and the seaweed with tiny living " +
  "creatures attached to it never lost their fascination for me.";

const Footer = () => {
  return (
    <>
      <FooterItem>
        <Button isBasic>Secondary</Button>
      </FooterItem>
      <FooterItem>
        <Button
          isPrimary
          onClick={() => {
            alert("Ahoy!");
          }}
        >
          Primary
        </Button>
      </FooterItem>
    </>
  );
};
const customContent = [
  "ELEMENT 1",
  "ELEMENT 2",
  "ELEMENT 3",
  "ELEMENT 4",
  "ELEMENT 5",
].map((el) => <li>{el}</li>);

const defaultArgs: ModalStoryArgs = {
  isLarge: false,
  isExtraLarge: false,
  onClose: (e) => {
    alert("Close clicked");
    console.log(e);
  },
};

type Args = ModalStoryArgs & {};

const meta = {
  title: "Molecules/Modals",
  component: Modal,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A124",
    },
  },
  render: (args) => {
    return (
      <Modal {...args}>
        <Modal.Header>
          {args.title ? args.title : <Placeholder display="block" />}
        </Modal.Header>
        <Modal.Body>
          {args.content ? args.content : <Placeholder display="block" />}
        </Modal.Body>
        <Modal.Footer>
          {args.footer ? args.footer : <Placeholder display="block" />}
        </Modal.Footer>
      </Modal>
    );
  },
  args: {},
} satisfies Meta<Args>;

export default meta;

export const Default = {
  args: {
    ...defaultArgs,
  },
};

export const Large = {
  args: {
    ...defaultArgs,
    title: "Cool title",
    content: longContent,
    footer: <Footer />,
    isLarge: true,
  },
};

export const WithCustomContent = {
  args: {
    ...defaultArgs,
    title: "Cool title",
    content: <ul>{customContent}</ul>,
    footer: <Footer />,
  },
};
