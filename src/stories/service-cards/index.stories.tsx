import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { ReactComponent as ExploratoryIcon } from "../../assets/icons/service-exploratory-icon.svg";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { ServiceCardsProps } from "./_types";
import { ServiceCard } from "./index";

const defaultArgs: ServiceCardsProps = {
  serviceIcon: <ExploratoryIcon />,
  serviceTitle: "Bug hunting and Customer Feedback",
  serviceSubtitle:
    "Trova ed elimina i bug e garantisci un'esperienza memorabile.",
  tags: [
    {
      label: "Explore",
      icon: <ExploratoryIcon />,
    },
    {
      label: "Explore",
      icon: <ExploratoryIcon />,
    },
  ],
  isHoverable: true,
  hoverTitle: "Functional testing",
  hoverSubtitle:
    "We assign our experienced testers test cases, such as purchasing with a credit card or creating an account, and they will detect the bugs.",
  hoverButtons: [
    <Button isStretched size="small" isAccent>
      Come funziona
    </Button>,
    <Button isPrimary isStretched size="small" isAccent>
      Lancia campagna
    </Button>,
  ],
};

const SingleTemplate: Story<ServiceCardsProps> = (args) => {
  return <ServiceCard {...args} />;
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  ...defaultArgs,
};

const MultiTemplate: Story<ServiceCardsProps> = (args) => {
  return (
    <Row>
      <Col size={3}>
        <ServiceCard {...args} />
      </Col>
      <Col size={3}>
        <ServiceCard {...args} />
      </Col>
      <Col size={3}>
        <ServiceCard {...args} />
      </Col>
      <Col size={3}>
        <ServiceCard {...args} />
      </Col>
    </Row>
  );
};

export const Grid = MultiTemplate.bind({});
Grid.args = {
  ...defaultArgs,
};

export default {
  title: "Molecules/Card/ServiceCard",
  component: ServiceCard,
  argTypes: {
    isRecessed: {
      table: {
        disable: true,
      },
    },
    isFloating: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof ServiceCard>;
