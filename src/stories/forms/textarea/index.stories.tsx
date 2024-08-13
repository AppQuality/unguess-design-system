import { Meta, StoryFn } from "@storybook/react";
import { Textarea } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { TextareaArgs } from "./_types";

const defaultArgs: TextareaArgs = {
  isBare: false,
  focusInset: false,
  minRows: 3,
  maxRows: 9,
};

const Template: StoryFn<TextareaArgs> = (args) => {
  return (
    <Row>
      <Col>
        <Field>
          <Label isRegular={true}>Questa è la Label della Textarea</Label>
          <Textarea {...args} />
        </Field>
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  validation: "warning",
};

export const Resize = Template.bind({});
Resize.args = {
  ...defaultArgs,
  isResizable: true,
};

export default {
  title: "Molecules/Forms/Textarea",
  component: Textarea,
} as Meta<typeof Textarea>;
