import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionArgs } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { Checkbox } from "../forms/checkbox";
import React, { useState } from "react";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { ReactComponent as LeafIcon } from "../../assets/icons/leaf-stroke.svg";
import { Tag } from "../tags";
import { theme } from "../theme";
import { StatusCompletedIcon } from "../icons";

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

type StoryArgs = AccordionArgs & {
  hasCheckbox?: boolean;
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
  icon?: React.ReactNode;
  isLarge?: boolean;
  subtitles?: string;
  supertitles?: string;
  meta?: React.ReactNode;
};

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
                <Accordion.Section isSelected={selected}>
                  <Accordion.Header
                    hasCheckbox={args.hasCheckbox}
                    checkboxProps={{ onChange: () => setIsSelected(!selected) }}
                    icon={args.icon}
                  >
                    <Accordion.Label isLarge={args.isLarge}
                      label={item.headerTitle}
                      subtitle={args.subtitles}
                      supertitle={args.supertitles}
                      meta
                    />
                    {args.meta && <Accordion.Meta>{args.meta}</Accordion.Meta>}
                  </Accordion.Header>
                  <Accordion.Panel>{item.accordionContent}</Accordion.Panel>
                </Accordion.Section>
              )
            })}
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

const defaultArgs: StoryArgs = {
  level: 3,
  hasCheckbox: false,
  isLarge: false,
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

export const FullLabel: Story = {
  args: {
    ...defaultArgs,
    icon: <FolderIcon />,
    hasCheckbox: true,
    subtitles: "Some more info on the item",
    supertitles: "00:00:23 - 00:00:27"
  },
};

export const WithMeta: Story = {
  args: {
    ...defaultArgs,
    meta: <>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag
        color={theme.palette.green[800]}
        hue="rgba(0,0,0,0)"
        style={{ marginBottom: theme.space.xxs }}
      >
        <Tag.Avatar>
          <StatusCompletedIcon />
        </Tag.Avatar>
        Completed
        <Tag.SecondaryText color={theme.palette.grey[700]}>
          1
        </Tag.SecondaryText>
      </Tag>
      <Tag>
        <Tag.Avatar>
          <LeafIcon />
        </Tag.Avatar>
        Counter
        <Tag.SecondaryText
          color={"#000000"}
          isBold
        >
          2
        </Tag.SecondaryText>
      </Tag>
    </>
  },
};