import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Radio } from ".";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { Label } from "../../label";
import { FormField as Field } from "../field";
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
} as ComponentMeta<typeof Radio>;
