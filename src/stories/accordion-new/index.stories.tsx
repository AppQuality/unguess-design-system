import { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { ReactNode } from "react";
import { AccordionArgs, AccordionNew } from ".";
import { StatusCompletedIcon } from "../icons";
import { Placeholder } from "../placeholder";
import { Tag } from "../tags";
import { theme } from "../theme";
import SectionStory, {
  Default as SectionStoryDefault,
} from "./section.stories";

type StoryArgs = AccordionArgs & {
  panelContent?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  hasSubtitles?: boolean;
  hasSupertitles?: boolean;
};

const accordionContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const items = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Equum cibum est optimum prandium est",
];

const ExampleIcon = () => {
  return <FolderIcon />;
};
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
        <Tag.SecondaryText color={theme.palette.grey[700]}>1</Tag.SecondaryText>
      </Tag>
      <Tag>
        <Tag.Avatar>
          <LeafIcon />
        </Tag.Avatar>
        Counter
        <Tag.SecondaryText color={"#000000"} isBold>
          2
        </Tag.SecondaryText>
      </Tag>
    </>
  );
};

const ExamplePanel = () => {
  return (
    <div>
      <p>{accordionContent}</p>
      <p>{accordionContent}</p>
    </div>
  );
};

const meta = {
  title: "Molecules/New Accordion",
  component: AccordionNew,

  render: ({ ...args }) => {
    return (
      <AccordionNew {...args} id="accordion" expandedSections={[]}>
        {<SectionStory.render {...SectionStoryDefault.args} />}
      </AccordionNew>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: StoryArgs = {
  level: 3,
  panelContent: <ExamplePanel />,
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
    hasShadow: true,
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
