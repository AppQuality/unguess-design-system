import { StoryFn, Meta } from "@storybook/react";
import styled from "styled-components";
import { Player } from ".";
import { PlayerArgs } from "./_types";

const Container = styled.div`
  height: 80vh;
`;

interface PlayerStoryArgs extends PlayerArgs {
  url: string;
}

const defaultArgs: PlayerStoryArgs = {
  //   url: "https://s3.eu-west-1.amazonaws.com/tryber.media.production/media/T6631/CP4462/bugs/bf2ed159c4c8024a82116a5dfa26ef434180db334304e0372a531592040452e4.mp4",
  url: "https://s3-eu-west-1.amazonaws.com/appq.use-case-media/CP3461/UC8794/T19095/ebf00412a1bc3fd33fddd52962cf80e6853a10d5_1625090207.mp4",
};

const Template: StoryFn<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <Player {...args} />
  </Container>
);

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
};

export const Streaming = Template.bind({});
Streaming.args = {
  ...defaultArgs,
  url: "https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/db00e97cfb85971e3fa71b7735142e07ab2d1ebf_1605195177.m3u8",
  start: 10,
  end: 20,
};

export default {
  title: "Organisms/Player",
  component: Player,
  argTypes: {
    url: {
      name: "Video URL",
      description: "The url of the video to play",
      control: "text",
    },
  },
} as Meta<typeof Player>;
