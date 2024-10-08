import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { ReactComponent as InfoImg } from "../../assets/icons/info-image.svg";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { InfoCardProps } from "./_types";
import { InfoCard } from "./index";

const defaultArgs: InfoCardProps = {
  infoImg: <InfoImg />,
  infoSubtitle: "TIP",
  infoTitle: "Can't find what you're looking for?",
  infoButtons: [
    <Button isPrimary size="small" isAccent>
      Get in touch with your CSM
    </Button>,
  ],
};

const SingleTemplate: Story<InfoCardProps> = (args) => {
  return <InfoCard {...args} />;
};

export const SingleCard = SingleTemplate.bind({});
SingleCard.args = {
  ...defaultArgs,
};

const MultiTemplate: Story<InfoCardProps> = (args) => {
  return (
    <Row>
      <Col sm={12} md={6} lg={3}>
        <InfoCard {...args} />
      </Col>
      <Col sm={12} md={6} lg={3}>
        <InfoCard {...args} />
      </Col>
      <Col sm={12} md={6} lg={3}>
        <InfoCard {...args} />
      </Col>
      <Col sm={12} md={6} lg={3}>
        <InfoCard {...args} />
      </Col>
    </Row>
  );
};

export const Grid = MultiTemplate.bind({});
Grid.args = {
  ...defaultArgs,
};

export default {
  title: "Molecules/Card/InfoCard",
  component: InfoCard,
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
} as ComponentMeta<typeof InfoCard>;
