import { ComponentMeta, Story } from "@storybook/react";
import { Row } from ".";
import { RowArgs } from "./_types";
import { Col } from "../col";
import { Basic as BasicCol } from "../col/index.stories";
import { ColArgs } from "../col/_types";

export interface RowStoryArg extends RowArgs {
  cols: Array<ColArgs>;
}

const defaultArgs: RowStoryArg = {
  cols: [
    {
      ...BasicCol.args,
      children: "Column 1",
    },
    {
      ...BasicCol.args,
      children: "Column 2",
    },
    {
      ...BasicCol.args,
      children: "Column 3",
    },
  ],
};

const Template: Story<RowStoryArg> = ({cols, ...args}) => {
  return (
    <Row {...args}>
      {cols.map((col) => (
        <Col {...col} />
      ))}
    </Row>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/Grid/Row",
  component: Row,
} as ComponentMeta<typeof Row>;