import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Placeholder } from "../placeholder";
import { theme } from "../theme";
import { SM } from "../typography/typescale";
import { ServiceTile } from "./";
import { ReactComponent as AccessibilityIcon } from "./data/accessibility.svg";
import { ReactComponent as ExperientialIcon } from "./data/experiential.svg";
import { ReactComponent as FunctionalIcon } from "./data/functional.svg";

import { ReactComponent as ClockIcon } from "@zendeskgarden/svg-icons/src/12/clock-stroke.svg";
import { ReactComponent as ListBullet } from "@zendeskgarden/svg-icons/src/12/list-bullet-stroke.svg";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/12/user-solo-stroke.svg";
import { ReactComponent as BugIcon } from "./data/bug-solid.svg";

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
    icon: <Placeholder />,
    price: "Value",
    superscript: "First Row",
    additionalInfo: <Placeholder />,
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
    background: { table: { disable: true } },
    icon: { table: { disable: true } },
  },

  render: ({ type, background, ...args }) => {
    const getAdditionalProps = () => {
      if (type === "experiential")
        return {
          background:
            "linear-gradient(90deg, rgba(12,77,94,1) 35%, rgba(43,132,115,1) 100%)",
          icon: <ExperientialIcon />,
          additionalInfo: (
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ClockIcon/>
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  72h
                </SM>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <UserIcon />
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  5 users
                </SM>
              </div>
            </div>
          ),
        };
      if (type === "functional") {
        return {
          background: "linear-gradient(91deg, #001825 0%, #003A57 100%)",
          icon: <FunctionalIcon />,
          additionalInfo: (
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ClockIcon />
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  12h
                </SM>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <BugIcon/>
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  5 bugs
                </SM>
              </div>
            </div>
          ),
        };
      }
      if (type === "usability") {
        return {
          background: "linear-gradient(91deg, #8A0C49 0%, #D81E57 100%)",
          icon: <AccessibilityIcon />,
          additionalInfo: (
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ClockIcon />
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  72h
                </SM>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ListBullet  />
                <SM isBold color={`${theme.palette.grey[700]}`}>
                  Type A Issues
                </SM>
              </div>
            </div>
          ),
        };
      }
      return { background };
    };
    const additionalProps = getAdditionalProps();
    return <ServiceTile {...args} {...additionalProps} />;
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Description",
    title: "Title",

    type: "none",
  },
};

export const ExperientialTile: Story = {
  args: {
    title: "Collect valuable feedbacks",
    description: "Assess your product usability",
    price: "12 Token",
    superscript: "Offerta Black Friday",
    type: "experiential",
  },
};

export const AccessibilityTile: Story = {
  args: {
    title: "Remove digital barriers",
    description: "Verify your accessibility compliance",
    price: "12 Token",
    superscript: "App exclusive",
    type: "usability",
  },
};

export const FunctionalTile: Story = {
  args: {
    title: "Uncover critical issues",
    description: "Explore your latest release",
    price: "5 Token",
    superscript: "8 Token",
    isSuperscriptStrikethrough: true,
    type: "functional",
  },
};

export const WithLongTitle: Story = {
  args: {
    title:
      "Uncover critical issues. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Explore your latest release",
    price: "5 Token",
    superscript: "8 Token",
    isSuperscriptStrikethrough: true,
    type: "functional",
  },
};
