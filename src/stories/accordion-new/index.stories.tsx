import { Meta, StoryObj } from "@storybook/react";
import { AccordionArgs, AccordionNew } from ".";
import { Placeholder } from "../placeholder";

const accordionContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const items = [
  {
    accordionContent,
    headerTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est",
  },
  {
    accordionContent,
    headerTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    accordionContent,
    headerTitle: "Lorem ipsum dolor sit amet",
  },
];

type StoryArgs = AccordionArgs & {};

const meta = {
  title: "Molecules/New Accordion",
  component: AccordionNew,

  render: ({ ...args }) => {
    return (

      <AccordionNew {...args}>
        {items.map((item) => {
          return (
            <AccordionNew.Section>
              <AccordionNew.Header>
                <AccordionNew.Label label={item.headerTitle} />
              </AccordionNew.Header>
              <AccordionNew.Panel><Placeholder /></AccordionNew.Panel>
            </AccordionNew.Section>
          )
        })}
      </AccordionNew>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: StoryArgs = {
  level: 3,
  isBare: false
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Bare: Story = {
  args: {
    ...defaultArgs,
    isBare: true,
  },
};
