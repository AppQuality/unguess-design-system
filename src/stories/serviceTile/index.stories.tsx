import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ReactComponent as ClockIcon } from "@zendeskgarden/svg-icons/src/16/clock-stroke.svg";
import { ReactComponent as ListBullet } from "@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";
import { ServiceTile } from "./";
import { ReactComponent as AccessibilityIcon } from "./data/accessibility.svg";
import { ReactComponent as Bug } from "./data/bug-solid.svg";
import { ReactComponent as ExperientialIcon } from "./data/experiential.svg";
import { ReactComponent as FunctionalIcon } from "./data/functional.svg";

const TYPES = [
  "none" as const,
  "experiential" as const,
  "functional" as const,
  "usability" as const,
];

type Args = React.ComponentProps<typeof ServiceTile> & {
  type: (typeof TYPES)[number];
};

const meta = {
  title: "Atoms/ServiceTile",
  component: ServiceTile,
  args: {
    onClick: fn(),
    description: "Description",
    title: "Title",
    icon: <div>icon</div>,
    price: "Value",
    superscript: "First Row",
    additionalInfo: [
      {
        icon: <div>Icon</div>,
        text: "Text",
      },
    ],
    background: "green",
  },

  argTypes: {
    type: {
      options: TYPES,
      defaultValue: "none",
      control: {
        type: "select",
      },
    },
  },

  render: ({ type, background, ...args }) => {
    const getBackground = () => {
      if (type === "experiential")
        return "linear-gradient(90deg, rgba(12,77,94,1) 35%, rgba(43,132,115,1) 100%)";
      if (type === "functional") {
        return "linear-gradient(91deg, #001825 0%, #003A57 100%)";
      }
      if (type === "usability") {
        return "linear-gradient(91deg, #8A0C49 0%, #D81E57 100%)";
      }
      return background;
    };
    return <ServiceTile {...args} background={getBackground()} />;
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Description",
    title: "Title",
    icon: <div>icon</div>,

    additionalInfo: [
      {
        icon: <div>Icon</div>,
        text: "Text",
      },
    ],
    type: "none",
  },
};

export const ExperiencialTile: Story = {
  args: {
    title: "Collect valuable feedbacks",
    description: "Assess your product usability",
    icon: <ExperientialIcon />,
    price: "12 Token",
    superscript: "Offerta Black Friday",

    additionalInfo: [
      {
        icon: <ClockIcon width={12} height={12} />,
        text: "72 h",
      },
      {
        icon: <UserIcon width={12} height={12} />,
        text: "5 users",
      },
    ],
    type: "experiential",
  },
};

export const AccessibilityTile: Story = {
  args: {
    title: "Remove digital barriers",
    description: "Verify your accessibility compliance",
    icon: <AccessibilityIcon />,
    price: "12 Token",
    superscript: "App exclusive",
    additionalInfo: [
      {
        icon: <ClockIcon width={12} height={12} />,
        text: "72 h",
      },
      {
        icon: <ListBullet width={12} height={12} />,
        text: "Type Issues",
      },
    ],
    type: "usability",
  },
};

export const FunctionalTile: Story = {
  args: {
    title: "Uncover critical issues",
    description: "Explore your latest release",
    icon: <FunctionalIcon />,
    price: "5 Token",
    superscript: "8 Token",
    isSuperscriptStrikethrough: true,
    additionalInfo: [
      {
        icon: <ClockIcon width={12} height={12} />,
        text: "12 h",
      },
      {
        icon: <Bug width={12} height={12} />,
        text: "5 bugs",
      },
    ],
    type: "functional",
  },
};
