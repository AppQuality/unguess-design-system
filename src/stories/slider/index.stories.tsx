import { ComponentMeta, Story } from "@storybook/react";
import { Slider } from ".";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { XL, MD } from "../typography/typescale";
import { SliderArgs } from "./_types";
import styled from "styled-components";
import { theme } from "../theme";

interface SliderStoryArg extends SliderArgs {
  items: Array<{
    headerTitle: string;
    content: string;
  }>;
}

const Slide = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.xl};
  background-color: ${({ theme }) => theme.palette.white};
`;

const Template: Story<SliderStoryArg> = ({ items, ...args }) => {
  return (
    <Row justifyContent="center">
      <Col sm={10} style={{ backgroundColor: theme.palette.grey[100] }}>
        <div style={{ padding: "12px" }}>
          <Slider {...args}>
            {items.map((item) => (
              <div>
                <Slide>
                  <XL>{item.headerTitle}</XL>
                  <MD>{item.content}</MD>
                </Slide>
              </div>
            ))}
          </Slider>
        </div>
      </Col>
    </Row>
  );
};

const slideContent = {
  headerTitle: "Equum cibum est optimum prandium est",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const defaultArgs: SliderStoryArg = {
  items: [
    {
      ...slideContent,
      headerTitle: "(1) " + slideContent.headerTitle,
    },
    {
      ...slideContent,
      headerTitle: "(2) " + slideContent.headerTitle,
      content: slideContent.content.repeat(2),
    },
    {
      ...slideContent,
      headerTitle: "(3) " + slideContent.headerTitle,
    },
  ],
  dots: false,
  adaptiveHeight: true,
  infinite: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A80",
  },
};

// export const Bare = Template.bind({});
// Bare.args = {
//   ...defaultArgs,
//   isBare: true,
// };

// Bare.parameters = {
//   design: {
//     type: "figma",
//     url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A86",
//   },
// };

// export const Expandable = Template.bind({});
// Expandable.args = {
//   ...defaultArgs,
//   isExpandable: true,
// };

// export const Compact = Template.bind({});
// Compact.args = {
//   ...defaultArgs,
//   isCompact: true,
// };

// Compact.parameters = {
//   design: {
//     type: "figma",
//     url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=1510%3A3230",
//   },
// };

export default {
  title: "Organisms/Slider",
  component: Slider,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
  }
} as ComponentMeta<typeof Slider>;
