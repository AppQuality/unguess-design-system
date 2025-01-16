import { Meta, StoryObj } from "@storybook/react";
import { AccordionNew } from ".";
import { Checkbox } from "../forms/checkbox";
import React from "react";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { Placeholder } from "../placeholder";
import { AccordionSectionArgs } from "./AccordionSection";


type StoryArgs = AccordionSectionArgs & {
  isCompact?: boolean;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  hasCheckbox?: boolean;
  icon?: React.ReactNode;
  hasSubtitles?: boolean;
  hasSupertitles?: boolean;
  hasMeta?: boolean;
  isOpen?: boolean;
};

const meta = {
  title: "Molecules/New Accordion/Section",
  component: AccordionNew.Section,
  decorators: [
    (Story: React.ComponentType, context) => {
      return(
      <AccordionNew level={3} expandedSections={context.args.isOpen ? [0] : []}>
        <Story />
      </AccordionNew>
    )},
  ],
  render: ({ ...args }) => {
    return (
      <AccordionNew.Section>
        <AccordionNew.Header
          icon={args.icon}
        >
          <AccordionNew.Label
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est"
            subtitle={args.hasSubtitles ? "Some more info on the item" : ""}
            supertitle={args.hasSupertitles ? "00:00:23 - 00:00:27" : ""}
          />
          {args.hasMeta && <AccordionNew.Meta>
            <Placeholder />
          </AccordionNew.Meta>}
        </AccordionNew.Header>
        <AccordionNew.Panel><Placeholder /></AccordionNew.Panel>
      </AccordionNew.Section>

    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: StoryArgs = {
  hasCheckbox: false,
  isCompact: false,
  hasSubtitles: false,
  hasSupertitles: false,
  hasMeta: false,
  isOpen: false,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
