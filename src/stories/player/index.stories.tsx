import { Meta, StoryFn } from "@storybook/react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Player } from ".";
import { IBookmark, PlayerArgs } from "./_types";
import { theme } from "../theme";

const Container = styled.div`
  height: 80vh;
`;

interface PlayerStoryArgs extends PlayerArgs {}

const defaultArgs: PlayerStoryArgs = {
  //   url: "https://s3.eu-west-1.amazonaws.com/tryber.media.production/media/T6631/CP4462/bugs/bf2ed159c4c8024a82116a5dfa26ef434180db334304e0372a531592040452e4.mp4",
  url: "https://s3-eu-west-1.amazonaws.com/appq.use-case-media/CP3461/UC8794/T19095/ebf00412a1bc3fd33fddd52962cf80e6853a10d5_1625090207.mp4",
  onCutHandler: undefined, // Storybook fix https://github.com/storybookjs/storybook/issues/22930
};

const Template: StoryFn<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <Player {...args} />
  </Container>
);

const TemplateWithCutter: StoryFn<PlayerStoryArgs> = ({
  bookmarks,
  ...args
}) => {
  const [observations, setObservations] = useState<IBookmark[]>(
    bookmarks || []
  );
  const [start, setStart] = useState<number | undefined>(undefined);

  const handleCut = useCallback(
    (time: number) => {
      if (!start) {
        setStart(time);
        return;
      }

      setObservations([
        ...observations,
        {
          id: observations.length + 10,
          start,
          end: time,
          hue: theme.colors.neutralHue,
          label: "New observation",
        },
      ]);
      setStart(undefined);
    },
    [observations, start]
  );

  return (
    <Container id="player.story.container">
      <Player
        {...args}
        onCutHandler={handleCut}
        bookmarks={observations}
        isCutting={!!start}
      />
      {start && (
        <div>
          Click again to set the end time for observation
          <br />
          Start: {start}
        </div>
      )}
    </Container>
  );
};

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

export const WithBookmarks = TemplateWithCutter.bind({});
WithBookmarks.args = {
  ...Streaming.args,
  end: 200,
  bookmarks: [
    // the observation time is relative to the video start,
    // so in this case a start from 20s is actually 10s in the video
    {
      id: 2,
      start: 20,
      end: 25,
      hue: theme.colors.dangerHue,
      label: "10s - 15s ",
    },
    {
      id: 3,
      start: 30,
      end: 38,
      hue: theme.colors.foreground,
      label: "20s - 28s",
    },
    {
      id: 4,
      start: 40,
      end: 45,
      hue: theme.colors.successHue,
      label: "30s - 35s",
    },
    {
      id: 5,
      start: 50,
      end: 70,
      hue: theme.colors.dangerHue,
      label: "40s - 60s",
    },
    {
      id: 6,
      start: 120,
      end: 170,
      hue: theme.colors.chromeHue,
      label: "110s - 160s",
    },
  ],
  handleBookmarkUpdate: (bookmark: IBookmark) => {
    console.log("Bookmark updated", bookmark);
  },
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
