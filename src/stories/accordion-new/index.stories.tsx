import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionArgs } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { Checkbox } from "../forms/checkbox";
import { useState } from "react";
import styled from "styled-components";

const accordionContent = {
  headerTitle: "Equum cibum est optimum prandium est",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const items = [
  {
    ...accordionContent,
    headerTitle: "(1) " + accordionContent.headerTitle,
  },
  {
    ...accordionContent,
    headerTitle: "(2) " + accordionContent.headerTitle,
  },
  {
    ...accordionContent,
    headerTitle: "(3) " + accordionContent.headerTitle,
  },
];

type StoryArgs = AccordionArgs & {
  hasCheckbox?: boolean;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
};

const StyledAccordionSection = styled(Accordion.Section)`
  &.isSelected {
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
`;

const meta = {
  title: "Molecules/New Accordion",
  component: Accordion,

  render: ({ ...args }) => {
    return (
      <Row justifyContent="center">
        <Col sm={10}>
          <Accordion {...args}>
            {items.map((item) => {
              const [selected, setIsSelected] = useState(false);
              return (
              <StyledAccordionSection isSelected={selected}>
                <Accordion.Header hasCheckbox={args.hasCheckbox} checkboxProps={{onChange: () => setIsSelected(!selected)}}>
                  <Accordion.Label>{item.headerTitle}</Accordion.Label>
                </Accordion.Header>
                <Accordion.Panel>{item.content}</Accordion.Panel>
              </StyledAccordionSection>
            )})}
          </Accordion>
        </Col>
      </Row>
    );
  },
  args: {
    level: 4,
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 4
  },
};

export const Selectable: Story = {
  args: {
    level: 4,
    hasCheckbox: true,
    isBare: true,
  },
};