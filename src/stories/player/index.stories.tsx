import { ComponentMeta, Story } from "@storybook/react";
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
  url: "https://s3-eu-west-1.amazonaws.com/appq.use-case-media/CP3369/UC7885/T26905/a1d7e371f9dd59f9d3fa15735f8aa5ff1a2e1550_1621603913.mp4",
};

const Template: Story<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <Player {...args}>
      <source src={args.url} type="video/mp4" />
    </Player>
  </Container>
);

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
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
} as ComponentMeta<typeof Player>;
