// import { ComponentMeta, Story } from "@storybook/react";
import type { Meta, Story } from "@storybook/react";
import { ReactComponent as LeafIcon } from "../../../assets/icons/leaf-stroke.svg";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { Button } from ".";
import { ButtonArgs } from "./_types";
import { Col as ZendeskCol, Grid, Row as ZendeskRow } from "@zendeskgarden/react-grid";
import styled from "styled-components";

const Row = styled(ZendeskRow)`
  margin-bottom: 10px;
  max-width: 768px;
`;

const Col = styled(ZendeskCol)`
  display: flex;
  justify-content: center;
`;

const sizes = ["small", "medium", "large"] as const;
const variants = [
  {},
  { isDanger: true },
  { isAccent: true },
] as const;

const Template: Story<ButtonArgs> = (args) => {
  return (
    <Grid>
      {variants.map((variant, i) => (
        <Row key={i}>
          {sizes.map((size, i) => (
            <Col size={3} key={i}>
              <Button {...args} size={size} {...variant}>
                {size}
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

const TemplateIcon: Story<ButtonArgs> = (args) => {
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

const TemplateDisabled: Story<ButtonArgs> = (args) => {
  return (
    <Grid>
      <Row>
        {sizes.map((size, j) => (
          <Col size={3} key={j}>
            <Button {...args} disabled size={size}>
              {size}
            </Button>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};


export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9271",
  },
};

export const Basic =  Template.bind({});
Basic.args = {
  isBasic: true,
};

Basic.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9341",
  },
};

export const Primary = Template.bind({});
Primary.args = {
  isPrimary: true,
};

Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9410",
  },
};


export const WithIcon = TemplateIcon.bind({});

WithIcon.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9410',
  },
};

export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
  disabled: true,
};

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
