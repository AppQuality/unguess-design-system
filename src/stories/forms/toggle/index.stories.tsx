import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Toggle } from ".";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { Label } from "../../label";
import { LabelArgs } from "../../label/_types";
import { Basic as BasicLabel } from "../../label/index.stories";
import { Field } from "../field";
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
  );
};

export const Default = Template.bind({});
Default.args = {
  label: {
    ...BasicLabel.args,
    isRegular: true,
  },
};

export default {
  title: "Molecules/Forms/Toggle",
  component: Toggle,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Toggle>;
