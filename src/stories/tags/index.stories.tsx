import { ComponentMeta, Story } from "@storybook/react";
import { Tag } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TagArgs } from "./_types";
import { KEY_CODES } from "@zendeskgarden/container-utilities";
import { ReactComponent as LeafIcon } from "../../assets/icons/leaf-stroke.svg";

interface TagStoryProps extends TagArgs {
  canBeClosed: boolean;
  hasAvatar: boolean;
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
        <span>{args.title}</span>
        {canBeClosed && (
          <Tag.Close onClick={() => alert("Tag dismissed via mouse")} />
        )}
      </Tag>
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  title: "Questo è un tag",
};

export const Avatar = Template.bind({});
Avatar.args = {
  title: "Tag con avatar",
  hasAvatar: true,
};

export const Close = Template.bind({});
Close.args = {
  title: "Tag rimovibile",
  canBeClosed: true,
};

export default {
  title: "Atoms/Tag",
  component: Tag,
  parameters: {
    controls: {
      matchers: {
        color: /(hue)$/i,
      },
    },
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  // argTypes: {
  //   hue: {
  //     options: ['primary', 'secondary'],
  //     control: { type: 'radio' },
  //   },
  // },
} as ComponentMeta<typeof Tag>;
