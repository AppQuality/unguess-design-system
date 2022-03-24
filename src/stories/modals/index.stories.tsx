import { ModalArgs } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { Modal, FooterItem } from ".";
import { Button } from "../buttons/button";

interface ModalStoryArgs extends ModalArgs {
  content: string | any;
  title: string;
  isDanger?: boolean;
}
const longContent =
  "The tang of the untainted, fresh and free sea air was like a cool, " +
  "quieting thought, and the shells and pebbles and the seaweed with tiny living " +
  "creatures attached to it never lost their fascination for me.";

const customContent = [
  "ELEMENT 1",
  "ELEMENT 2",
  "ELEMENT 3",
  "ELEMENT 4",
  "ELEMENT 5",
].map((el) => <li>{el}</li>);

const design = {
  type: "figma",
  url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A124",
};

const defaultArgs: ModalStoryArgs = {
  isDanger: false,
  title: "Cool title",
  isLarge: false,
  content: longContent,
  onClose: (e) => {
    alert("Close clicked");
    console.log(e);
  }
};

const Template: Story<ModalStoryArgs> = (args) => {
  const { isDanger } = args;

  return (
    <Modal {...args}>
      <Modal.Header isDanger={isDanger}>{args.title}</Modal.Header>
      <Modal.Body>{args.content}</Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic onClick={args.onClose}>
            Secondary
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            isPrimary
            {...isDanger && { isDanger: true }}
            onClick={() => {
              alert("Ahoy!");
            }}
          >
            Primary
          </Button>
        </FooterItem>
      </Modal.Footer>
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.parameters = {
  design,
};

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  isDanger: true,
};

Danger.parameters = {
  design,
};

export const Large = Template.bind({});
Large.args = {
  ...defaultArgs,
  isLarge: true,
};
Large.parameters = {
  design,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  ...defaultArgs,
  content: <ul>{customContent}</ul>,
};

export default {
  title: "Molecules/Modals",
  component: Modal,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Modal>;
