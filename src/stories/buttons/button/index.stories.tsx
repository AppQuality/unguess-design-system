import type { Meta, StoryFn } from "@storybook/react";
import { ReactComponent as LeafIcon } from "../../../assets/icons/leaf-stroke.svg";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { Button } from ".";
import { ButtonArgs } from "./_types";
import { Grid } from "@zendeskgarden/react-grid";
import { Col, MD, Row, sizes, variants } from "../utils";

const SizeTemplate: StoryFn<ButtonArgs> = (args) => (
  <Row>
    {sizes.map((size, i) => (
      <Col size={3} key={i}>
        <Button {...args} size={size}>
          {size}
        </Button>
      </Col>
    ))}
  </Row>
);

const Template: StoryFn<ButtonArgs> = (args) => {
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

const TemplateIcon: StoryFn<ButtonArgs> = (args) => {
  return (
    <Grid>
      <Row>
        {sizes.map((size, j) => (
          <Col size={3} key={j}>
            <Button {...args} size={size}>
              <Button.StartIcon>
                <LeafIcon />
              </Button.StartIcon>
              {size}
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        {sizes.map((size, k) => (
          <Col size={3} key={k}>
            <Button {...args} size={size}>
              {size}
              <Button.EndIcon>
                <ChevronIcon />
              </Button.EndIcon>
            </Button>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export const Default = Template.bind({});

export const Basic = Template.bind({});
Basic.args = {
  isBasic: true,
};

export const Primary = Template.bind({});
Primary.args = {
  isPrimary: true,
};

export const Link = Template.bind({});
Link.args = {
  isLink: true,
};

export const WithIcon = TemplateIcon.bind({});

export default {
  title: "Atoms/Buttons/Button",
  component: Button,
  subcomponents: {
    "Button.StartIcon": Button.StartIcon,
    "Button.EndIcon": Button.EndIcon,
  },
  argTypes: {
    onClick: {
      table: {
        category: "Events",
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Button>;
