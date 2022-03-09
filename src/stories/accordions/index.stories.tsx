import { ComponentMeta, Story } from "@storybook/react";
import { Accordion } from ".";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { AccordionArgs } from "./_types";

interface AccordionStoryArg extends AccordionArgs {
  items: Array<{
    headerTitle: string;
    content: string;
  }>;
}

const Template: Story<AccordionStoryArg> = ({ items, ...args }) => {
  return (
    <Row justifyContent="center">
      <Col sm={10}>
        <Accordion {...args}>
          {items.map((item) => (
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>{item.headerTitle}</Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Section>
          ))}
        </Accordion>
      </Col>
    </Row>
  );
};

const accordionContent = {
  headerTitle: "Equum cibum est optimum prandium est",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const defaultArgs: AccordionStoryArg = {
  isBare: false,
  isExpandable: false,
  isAnimated: true,
  items: [
    {
      ...accordionContent,
      headerTitle: "(1) " + accordionContent.headerTitle,
    },
    {
      ...accordionContent,
      headerTitle: "(2) " + accordionContent.headerTitle,
    },
  ],
  level: 4,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Bare = Template.bind({});
Bare.args = {
  ...defaultArgs,
  isBare: true,
};

export const Expandable = Template.bind({});
Expandable.args = {
  ...defaultArgs,
  isExpandable: true,
};


export default {
  title: "Atoms/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;
