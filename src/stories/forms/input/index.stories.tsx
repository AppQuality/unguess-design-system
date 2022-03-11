import { ComponentMeta, Story } from "@storybook/react";
import { Input } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { InputArgs } from "./_types";

const defaultArgs: InputArgs = {
  isBare: false,
  focusInset: false,
};

const Template: Story<InputArgs> = (args) => {
  return (
    <Row>
      <Col sm={2}>
        <Field>
          <Label isRegular={true}>Questa è la Label dell'Input</Label>
          <Input {...args} />
        </Field>
      </Col>
    </Row>
  )
}

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  isBare: false,
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  validation: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  validation: 'warning'
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  validation: 'error'
};

export default {
  title: "Atoms/Forms/Input",
  component: Input
} as ComponentMeta<typeof Input>;
