import { Meta, StoryFn } from "@storybook/react";
import { Accordion } from ".";
import { userEvent, within, expect, getByRole } from "@storybook/test";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { AccordionArgs } from "./_types";

interface AccordionStoryArg extends AccordionArgs {
  items: Array<{
    headerTitle: string;
    content: string;
  }>;
}

const Template: StoryFn<AccordionStoryArg> = ({ items, ...args }) => {
  return (
    <Row justifyContent="center">
      <Col sm={10}>
        <Accordion {...args} data-test-id="accordion">
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

const accordionItems = [
  {
    headerTitle: "(1) Equum cibum est optimum prandium est",
    content:
      "This is the first content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    headerTitle: "(2) Equum cibum est optimum prandium est",
    content:
      "This is the second content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    headerTitle: "(3) Equum cibum est optimum prandium est",
    content:
      "This is the third content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
];

const defaultArgs: AccordionStoryArg = {
  isBare: false,
  isExpandable: false,
  isAnimated: true,
  items: accordionItems,
  level: 4,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A80",
  },
};

export const Bare = Template.bind({});
Bare.args = {
  ...defaultArgs,
  isBare: true,
};

Bare.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A86",
  },
};

export const Expandable = Template.bind({});
Expandable.args = {
  ...defaultArgs,
  isExpandable: true,
};
// overrride the play function to test the expandable accordion, which can have all the sections expanded
Expandable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const accordionButton = getByRole(canvasElement, 'button', { name: accordionItems[accordionItems.length-1].headerTitle })
  await userEvent.click(accordionButton);
  const accordionContentFirst = canvas.getByText(accordionItems[0].content).parentNode;
  const accordionContentLast = canvas.getByText(accordionItems[accordionItems.length-1].content).parentNode;
  expect(accordionContentFirst).toHaveAttribute("aria-hidden", "false");
  expect(accordionContentLast).toHaveAttribute("aria-hidden", "false");
}

export const Compact = Template.bind({});
Compact.args = {
  ...defaultArgs,
  isCompact: true,
};

Compact.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=1510%3A3230",
  },
};

export default {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accordionButton = getByRole(canvasElement, 'button', { name: accordionItems[accordionItems.length-1].headerTitle })
    await userEvent.click(accordionButton);
    const accordionContentFirst = canvas.getByText(accordionItems[0].content).parentNode;
    const accordionContentLast = canvas.getByText(accordionItems[accordionItems.length-1].content).parentNode;
    expect(accordionContentFirst).toHaveAttribute("aria-hidden", "true");
    expect(accordionContentLast).toHaveAttribute("aria-hidden", "false");
  },
} as Meta<typeof Accordion>;
