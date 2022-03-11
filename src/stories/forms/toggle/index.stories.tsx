import { ComponentMeta, Story } from "@storybook/react";
import { Toggle } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { LabelArgs } from "../../label/_types";
import { Basic as BasicLabel } from "../../label/index.stories";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { ToggleArgs } from "./_types";

interface ToggleStoryProps extends ToggleArgs {
  label: LabelArgs;
}

const Template: Story<ToggleStoryProps> = (args) => {
  return (
    <Row>
      <Col>
        <Field>
          <Toggle {...args}>
            <Label {...args.label}>Questa è la Label del Toggle</Label>
          </Toggle>
        </Field>
      </Col>
    </Row>
  )
}

export const Default = Template.bind({});
Default.args = {
  label: {
    ...BasicLabel.args,
    isRegular: true
  }
};

export default {
  title: "Molecules/Forms/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;
