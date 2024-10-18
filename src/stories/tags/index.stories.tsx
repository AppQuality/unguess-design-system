import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { Tag } from ".";
import { ReactComponent as LeafIcon } from "../../assets/icons/leaf-stroke.svg";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TagArgs } from "./_types";

interface TagStoryProps extends TagArgs {
  canBeClosed: boolean;
  hasAvatar: boolean;
  secondaryText: string;
  secondaryTextBold: boolean;
  secondaryTextColor: string;
}

const KEY_CODES = {
  DELETE: "Delete",
  BACKSPACE: "Backspace",
};

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === KEY_CODES.DELETE || e.key === KEY_CODES.BACKSPACE) {
    e.preventDefault();
    alert("Tag dismissed via keyboard");
  }
};
const Template: Story<TagStoryProps> = ({
  hasAvatar,
  canBeClosed,
  secondaryText,
  secondaryTextBold,
  secondaryTextColor = "inherit",
  children,
  ...args
}) => (
  <Row>
    <Col textAlign="center">
      <Tag tabIndex={0} onKeyDown={handleKeyDown} {...args}>
        {hasAvatar && (
          <Tag.Avatar>
            <LeafIcon />
          </Tag.Avatar>
        )}
        {children}
        {secondaryText && (
          <Tag.SecondaryText
            color={secondaryTextColor}
            isBold={secondaryTextBold}
          >
            {secondaryText}
          </Tag.SecondaryText>
        )}
        {canBeClosed && (
          <Tag.Close onClick={() => alert("Tag dismissed via mouse")} />
        )}
      </Tag>
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  children: "Questo è un tag",
};

export const Avatar = Template.bind({});
Avatar.args = {
  children: "Tag con avatar",
  hasAvatar: true,
};

export const Close = Template.bind({});
Close.args = {
  children: "Tag rimovibile",
  canBeClosed: true,
};

export const Round = Template.bind({});
Round.args = {
  children: 12,
  size: "large",
  isRound: true,
  canBeClosed: false,
  hasAvatar: false,
};

export const Counter = Template.bind({});
Counter.args = {
  children: "Tag counter",
  canBeClosed: false,
  hasAvatar: false,
  secondaryText: "14",
  secondaryTextColor: "#000000",
  secondaryTextBold: true,
};

export default {
  title: "Atoms/Tag",
  component: Tag,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    color: {
      control: { type: "color" },
    },
    hue: {
      control: { type: "color" },
    },
    secondaryTextColor: {
      control: { type: "color" },
    },
    secondaryTextBold: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof Tag>;
