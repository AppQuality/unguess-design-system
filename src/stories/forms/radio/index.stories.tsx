import { Meta, StoryFn } from "@storybook/react";
import { Radio } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { RadioArgs } from "./_types";

const Template: StoryFn<RadioArgs> = (args) => {
  return (
    <Row>
      <Col>
        <Field>
          <Radio {...args}>
            <Label isRegular={true}>Questa è la Label del Radio</Label>
          </Radio>
        </Field>
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export default {
  title: "Molecules/Forms/Radio",
  component: Radio,
} as Meta<typeof Radio>;
