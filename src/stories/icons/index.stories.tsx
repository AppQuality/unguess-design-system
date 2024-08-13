import { Meta, StoryFn } from "@storybook/react";
import { Icon } from ".";
import { IconArgs } from "./_types";
import { Row } from "../grid/row";
import { Col } from "../grid/col";

const Template: StoryFn<IconArgs> = (args) => {
  return (
    <Row>
      <Col textAlign="center">
        <Icon {...args} />
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "square",
  size: 24,
};
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/6Wf94FIaktAQevtlfDpfJG/UNGUESS-%7C-Icons-Library?node-id=1%3A97",
  },
};

export default {
  title: "Atoms/Icon",
  component: Icon,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["square", "triangle", "circle"],
      },
    },
  },
} as Meta<typeof Icon>;
