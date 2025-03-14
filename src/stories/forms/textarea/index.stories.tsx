import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Textarea } from ".";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { Label } from "../../label";
import { FormField as Field } from "../field";
import { TextareaArgs } from "./_types";

const defaultArgs: TextareaArgs = {
  isBare: false,
  focusInset: false,
  minRows: 3,
  maxRows: 9,
};

const Template: Story<TextareaArgs> = (args) => {
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
} as ComponentMeta<typeof Textarea>;
