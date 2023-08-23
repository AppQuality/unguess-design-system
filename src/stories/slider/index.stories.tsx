import { ComponentMeta, Story } from "@storybook/react";
import { Slider } from ".";
import { XL, MD } from "../typography/typescale";
import { SliderArgs } from "./_types";
import styled from "styled-components";
import { Player } from "../player";

const slideContent = {
  headerTitle: "Equum cibum est optimum prandium est",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export interface SliderStoryArg extends SliderArgs {
  items: Array<{
    headerTitle?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
  }>;
}

const TextContainer = styled.div`
  padding: 40px;
`;

const Template: Story<SliderStoryArg> = ({ items, ...args }) => {
  return (
    <Slider {...args}>
      {items.map((item) => (
        <div>
          <Slider.Slide>
            {item.imageUrl && <img src={item.imageUrl} />}
            {item.videoUrl && (
              <Player url={item.videoUrl} />
            )}
            {item.headerTitle && item.content && (
              <TextContainer>
                <XL>{item.headerTitle}</XL>
                <MD>{item.content}</MD>
              </TextContainer>
            )}
          </Slider.Slide>
        </div>
      ))}
    </Slider>
  );
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
  arrows: true,
  counter: true,
  onSlideChange: (index) => console.log("onSlideChange", index),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/9499khzH66QnptNPSpiaTQ/UNGUESS-%7C-Functional-Dashboard-Handoff?node-id=151%3A57479&t=S8lj7GWdM4CLxyoV-0",
  },
};

export const Media = Template.bind({});
Media.args = {
  ...defaultArgs,
  items: [
    {
      imageUrl:
        "https://s3.eu-west-1.amazonaws.com/tryber.media.production/media/T6631/CP4462/bugs/8e27a765440482a2b477fdc01d79bf3b5fd6223eb16168dab794f9a385e593af.jpg",
    },
    {
      videoUrl:
        "https://s3.eu-west-1.amazonaws.com/tryber.media.production/media/T6631/CP4462/bugs/bf2ed159c4c8024a82116a5dfa26ef434180db334304e0372a531592040452e4.mp4",
    },
    {
      imageUrl:
        "https://s3.eu-west-1.amazonaws.com/tryber.media.production/media/T40658/CP4462/bugs/1c98a61953d036b75265ac0eabaf7064cd7ac555c5a2d46dd40a1362adc5bf8b.jpeg",
    },
    {
      imageUrl:
        "https://s3.eu-west-1.amazonaws.com/crowd.appq.testbucket/4462/41304/12d9cd4d6c7c43f56939c4e192a3d826.jpg",
    },
  ],
};

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
  },
} as ComponentMeta<typeof Slider>;
