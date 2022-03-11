import { ComponentMeta, Story } from "@storybook/react";
import { Radio } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { RadioArgs } from "./_types";

const Template: Story<RadioArgs> = (args) => {
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
  )
}

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export default {
  title: "Atoms/Forms/Radio",
  component: Radio
} as ComponentMeta<typeof Radio>;
