import { ComponentMeta, Story } from "@storybook/react";
import { Tag } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TagArgs } from "./_types";
import { KEY_CODES } from "@zendeskgarden/container-utilities";
import { ReactComponent as LeafIcon } from "../../assets/icons/leaf-stroke.svg";
import { ReactComponent as ClockIcon } from "../../assets/icons/copy-stroke.svg";


interface TagStoryProps extends TagArgs {
  canBeClosed: boolean;
  hasAvatar: boolean;
  secondaryText: string;
  secondaryTextIsRegular: boolean;
  secondaryTextColor: string;
}

const handleKeyDown = (e: React.KeyboardEvent<any>) => {
  if (e.keyCode === KEY_CODES.DELETE || e.keyCode === KEY_CODES.BACKSPACE) {
    e.preventDefault();
    alert("Tag dismissed via keyboard");
  }
};
const Template: Story<TagStoryProps> = ({
  hasAvatar,
  canBeClosed,
  secondaryText,
  secondaryTextIsRegular = false,
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
          <Tag.SecondaryText color={secondaryTextColor} isRegular={secondaryTextIsRegular}>{secondaryText}</Tag.SecondaryText>
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
  secondaryTextIsRegular: false,
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
      control: { type: 'color' },
    },
    hue: {
      control: { type: 'color' },
    },
    secondaryTextColor: {
      control: { type: 'color' },
    },
  },
} as ComponentMeta<typeof Tag>;
