import { ComponentMeta, Story } from "@storybook/react";
import { UgIcon } from ".";
import { UgIconArgs } from "./_types";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";

const Template: Story<UgIconArgs> = (args) => {
  return (
    <Row>
      <Col textAlign="center">
        <UgIcon {...args} />
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: 'square'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6Wf94FIaktAQevtlfDpfJG/UNGUESS-%7C-Icons-Library?node-id=1%3A97',
  },
};

export default {
  title: "Atoms/UgIcon",
  component: UgIcon,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ['square', 'triangle', 'circle']
      }
    }
  }
} as ComponentMeta<typeof UgIcon>;
