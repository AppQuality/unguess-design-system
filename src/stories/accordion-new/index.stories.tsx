import { Meta, StoryObj } from "@storybook/react";
import { AccordionArgs, AccordionNew } from ".";
import { Placeholder } from "../placeholder";
import { ReactNode } from "react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { Tag } from "../tags";
import { StatusCompletedIcon } from "../icons";
import { theme } from "../theme";

type StoryArgs = AccordionArgs & {
  panelContent?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  hasSubtitles?: boolean;
  hasSupertitles?: boolean;
};

const accordionContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const items = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Lorem ipsum dolor sit amet",
];

const ExampleIcon = () => {
  return (
    <FolderIcon />
  );
}
const ExampleMeta = () => {
  return (
    <>
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
  );
}

const ExamplePanel = () => {
  return (
    <div>
      <p>
        {accordionContent}
      </p>
      <p>
        {accordionContent}
      </p>
    </div>
  );
}

const meta = {
  title: "Molecules/New Accordion",
  component: AccordionNew,

  render: ({ ...args }) => {
    return (
      <AccordionNew {...args}>
        {items.map((item) => {
          return (
            <AccordionNew.Section>
              <AccordionNew.Header icon={args.icon}>
                <AccordionNew.Label
                  subtitle={args.hasSubtitles ? "Some more info on the item" : undefined}
                  supertitle={args.hasSupertitles ? "00:00:23 - 00:00:27" : undefined}
                  label={item}
                />
                {args.meta && <AccordionNew.Meta>{args.meta}</AccordionNew.Meta>}
              </AccordionNew.Header>
              <AccordionNew.Panel>{args.panelContent}</AccordionNew.Panel>
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
  panelContent: <ExamplePanel />,
  responsiveBreakpoint: undefined,
  hasBorder: undefined,
  type: undefined,
  hasCheckbox: undefined,
  isCompact: undefined,
  icon: undefined,
  meta: undefined,
  hasSubtitles: false,
  hasSupertitles: false
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    meta: <Placeholder />,
    panelContent: <Placeholder />,
    icon: <Placeholder />,
  },
};

export const Bare: Story = {
  args: {
    ...defaultArgs,
    isBare: true,
  },
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    isCompact: true,
  },
};

export const WithCheckbox: Story = {
  args: {
    ...defaultArgs,
    hasCheckbox: true,
  },
};

export const WithBorderAndShadow: Story = {
  args: {
    ...defaultArgs,
    hasBorder: true,
    type: "primary",
  },
};

export const WithIcon: Story = {
  args: {
    ...defaultArgs,
    icon: <ExampleIcon />,
  },
};

export const WithMeta: Story = {
  args: {
    ...defaultArgs,
    meta: <ExampleMeta />,
  },
};

export const WithResponsiveMeta: Story = {
  args: {
    ...defaultArgs,
    meta: <ExampleMeta />,
    responsiveBreakpoint: 1027,
  },
};

export const MultilineTitle: Story = {
  args: {
    ...defaultArgs,
    hasSubtitles: true,
    hasSupertitles: true,
  },
};

export const Full: Story = {
  args: {
    ...defaultArgs,
    icon: <ExampleIcon />,
    hasCheckbox: true,
    hasSubtitles: true,
    hasSupertitles: true,
    meta: <ExampleMeta />,
  },
};
