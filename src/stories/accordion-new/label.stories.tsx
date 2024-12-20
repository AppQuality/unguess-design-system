import { Meta, StoryObj } from "@storybook/react";
import { AccordionNew } from ".";
import { Checkbox } from "../forms/checkbox";
import React from "react";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { Placeholder } from "../placeholder";
import { AccordionLabelArgs } from "./AccordionLabel";


type StoryArgs = AccordionLabelArgs & {
  isCompact?: boolean;
  hasSubtitles?: boolean;
  hasSupertitles?: boolean;
};

const meta = {
  title: "Molecules/New Accordion/Label",
  component: AccordionNew.Label,
  decorators: [
    (Story: React.ComponentType, context) => {
      return(
      <AccordionNew level={3} isCompact={context.args.isCompact}>
        <Story />
      </AccordionNew>
    )},
  ],
  render: ({ ...args }) => {
    return (
      <AccordionNew.Section>
        <AccordionNew.Header>
          <AccordionNew.Label
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est"
            subtitle={args.hasSubtitles ? "Some more info on the item" : ""}
            supertitle={args.hasSupertitles ? "00:00:23 - 00:00:27" : ""}
          />
        </AccordionNew.Header>
      </AccordionNew.Section>

    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: StoryArgs = {
  isCompact: false,
  hasSubtitles: false,
  hasSupertitles: false,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
