import { ComponentMeta, Story } from "@storybook/react";
import { Toggle } from ".";
import { Field } from "../../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { ToggleArgs } from "./_types";

const Template: Story<ToggleArgs> = (args) => {
  return (
    <Row>
      <Col>
        <Field>
          <Toggle {...args}>
            <Label isRegular={true}>Questa è la Label del Toggle</Label>
          </Toggle>
        </Field>
      </Col>
    </Row>
  )
}

export const Default = Template.bind({});
Default.args = {
  
};

export default {
  title: "Atoms/Forms/Toggle",
  component: Toggle
} as ComponentMeta<typeof Toggle>;
