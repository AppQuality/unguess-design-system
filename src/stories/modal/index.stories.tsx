import { ModalArgs } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { StyledModal } from "./index";

const longContent = "The tang of the untainted, fresh and free sea air was like a cool, " +
  "quieting thought, and the shells and pebbles and the seaweed with tiny living " +
  "creatures attached to it never lost their fascination for me."

const design = {
  type: "figma",
  url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A124"
}

const defaultArgs: ModalArgs ={
  onClose: (e) => {
    alert("Close clicked")
  },
  onConfirm: (e) => {
    alert("Confirm clicked")
  },
  onCancel: (e) => {
    alert("Cancel clicked")
  },
  isLarge: false,
  isDanger: false,
  confirmText: "Yes, go ahead",
  cancelText: "Oh no, go back!",
  content: longContent,
  open: true,
  title: "Cool title"
}

const Template: Story<ModalArgs> = (args) => {
  return (
    <StyledModal {...args}/>
  )
}

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
}
Default.parameters = {
  design
}

export const Danger = Template.bind({});
Danger.args = {
  ...defaultArgs,
  isDanger: true,
};
Danger.parameters = {
  design
}

export const Large = Template.bind({})
Large.args = {
  ...defaultArgs,
  isLarge: true
}
Large.parameters = {
  design
}

export default {
  title: "Atoms/Modals/StyledModal",
  component: StyledModal
} as ComponentMeta<typeof StyledModal>