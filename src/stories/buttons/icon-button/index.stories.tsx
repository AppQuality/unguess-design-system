import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Grid } from "@zendeskgarden/react-grid";
import { Tooltip } from "@zendeskgarden/react-tooltips"; //TODO: replace with unguess component
import { IconButton } from ".";
import { ReactComponent as LeafIcon } from "../../../assets/icons/leaf-stroke.svg";
import { Col, MD, Row, sizes, variants } from "../utils";
import { IconButtonArgs } from "./_types";

const SizeTemplate: Story<IconButtonArgs> = (args) => (
  <Row>
    {sizes.map((size, i) => (
      <Col size={3} key={i}>
        <Tooltip content="Tooltip content">
          <IconButton {...args} size={size}>
            <LeafIcon />
          </IconButton>
        </Tooltip>
      </Col>
    ))}
  </Row>
);

const Template: Story<IconButtonArgs> = (args) => {
  return (
    <Grid>
      {variants.map((variant, i) => (
        <>
          <MD>{Object.keys(variant)[0]}</MD>
          <SizeTemplate {...args} {...variant} key={i} />
        </>
      ))}
    </Grid>
  );
};

export const Default = Template.bind({});

export const Outline = Template.bind({});
Outline.args = {
  isBasic: false,
};

export const Primary = Template.bind({});
Primary.args = {
  isPrimary: true,
};

export const Shape = Template.bind({});
Shape.args = {
  isPill: false,
  isBasic: false,
};

export default {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof IconButton>;
