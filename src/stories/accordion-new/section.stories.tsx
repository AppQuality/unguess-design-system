import { Meta, StoryObj } from "@storybook/react";
import { AccordionNew } from ".";
import { Checkbox } from "../forms/checkbox";
import React from "react";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { Placeholder } from "../placeholder";
import { AccordionSectionArgs } from "./AccordionSection";


type StoryArgs = AccordionSectionArgs & {
  hasCheckbox?: boolean;
  selected?: boolean;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  icon?: React.ReactNode;
  isLarge?: boolean;
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
      <AccordionNew.Section isSelected={args.selected}>
        <AccordionNew.Header
          hasCheckbox={args.hasCheckbox}
          icon={args.icon}
        >
          <AccordionNew.Label isLarge={args.isLarge}
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est"
            subtitle={args.hasSubtitles ? "Some more info on the item" : ""}
            supertitle={args.hasSupertitles ? "00:00:23 - 00:00:27" : ""}
            meta
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
  isLarge: false,
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

export const Large: Story = {
  args: {
    ...defaultArgs,
    isLarge: true,
  },
};

export const Selectable: Story = {
  args: {
    ...defaultArgs,
    hasCheckbox: true,
  },
};

export const Icon: Story = {
  args: {
    ...defaultArgs,
    icon: <FolderIcon />,
  },
};

export const WithMeta: Story = {
  args: {
    ...defaultArgs,
    hasMeta: true,
  },
};

export const Full: Story = {
  args: {
    ...defaultArgs,
    icon: <FolderIcon />,
    hasCheckbox: true,
    hasSubtitles: true,
    hasSupertitles: true,
    hasMeta: true,
  },
};