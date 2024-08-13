import { Meta, StoryFn } from "@storybook/react";
import { Skeleton } from ".";
import { Col } from "../../grid/col";
import { Row } from "../../grid/row";
import { XXL, XL } from "../../typography/typescale";
import { SkeletonArgs } from "./_types";

const defaultArgs: SkeletonArgs = {
  isLight: false,
};

const Template: StoryFn<SkeletonArgs> = (args) => {
  return (
    <Row>
      <Col size={6}>
        <XXL>
          <Skeleton {...args} />
        </XXL>
        <XL>
          <Skeleton {...args} />
        </XL>
        <XL>
          <Skeleton {...args} />
          <Skeleton {...args} />
          <Skeleton {...args} />
        </XL>
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Light = Template.bind({});
Light.args = {
  ...defaultArgs,
  isLight: true,
};

export default {
  title: "Atoms/Loaders/Skeleton",
  component: Skeleton,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Skeleton>;
