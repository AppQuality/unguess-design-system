import { ProductCardProps } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { ProductCard } from "./index"
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import {ReactComponent as ExpressIcon} from "../../assets/icons/express-icon.svg";

const design = {
  type: "figma",
  url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=205%3A14819"
}

const defaultArgs: ProductCardProps = {
  isNew: true,
  title: "title html",
  preTitle: "Express",
  productTitle: "Test esplorativo",
  ctaLabel: "This is the cta label",
  isLoading: false,
  icon: <ExpressIcon />,
  onCtaClick: () => { alert("Cta clicked") }
}

const MultiTemplate: Story<ProductCardProps> = (args) => {
  return (
    <Row>
      <Col sm={6} md={3}>
        <ProductCard {...args}/>
      </Col>
      <Col sm={6} md={3}>
        <ProductCard {...args} isNew={false} />
      </Col>
      <Col sm={6} md={3}>
        <ProductCard {...args} isNew={false}/>
      </Col>
      <Col sm={6} md={3}>
        <ProductCard {...args} isNew={false} />
      </Col>
    </Row>
  )
}

const SingleTemplate: Story<ProductCardProps> = (args) => {
  return <ProductCard {...args} />
}

export const SingleCard = SingleTemplate.bind({})
SingleCard.args = {
  ...defaultArgs
}

export const Grid = MultiTemplate.bind({})
Grid.args = {
  ...defaultArgs
}

Grid.parameters = {
  design
}

export default {
  title: "Molecules/Card/ProductCard",
  component: ProductCard,
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
} as ComponentMeta<typeof ProductCard>
