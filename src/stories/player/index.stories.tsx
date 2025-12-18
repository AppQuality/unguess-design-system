import { Meta, StoryFn } from "@storybook/react";
import { Tag } from "@zendeskgarden/react-tags";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Player, PlayerProvider } from ".";
import { Button } from "../buttons/button";
import { theme } from "../theme";
import { IBookmark, PlayerArgs } from "./_types";

const Container = styled.div`
  height: 80vh;
`;

interface PlayerStoryArgs extends PlayerArgs {}

const defaultArgs: PlayerStoryArgs = {
  url: "https://s3.eu-west-1.amazonaws.com/appq.static/demo/098648899205a00f8311d929d3073499ef9d664b_1715352138.mp4",
  onCutHandler: undefined, // Storybook fix https://github.com/storybookjs/storybook/issues/22930
  onShortcut: (type: string) => console.log("Shortcut intercept", type),
};

const Template: StoryFn<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <Player {...args} />
  </Container>
);

const TemplateWithContext: StoryFn<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <PlayerProvider {...args}>
      <PlayerProvider.Core url={args.url} />
    </PlayerProvider>
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
          tooltipContent: "New observation",
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

const TemplateWithParagraphs: StoryFn<PlayerStoryArgs> = (args) => (
  <Container id="player.story.container">
    <Player {...args} />
    {Array.from({ length: 10 }).map((_, index) => (
      <p key={index}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    ))}
  </Container>
);

const TemplateWithButtonForPip: StoryFn<PlayerStoryArgs> = (args) => {
  const [isPip, setIsPip] = useState(false);
  const handlePipChange = useCallback(
    (isPipFromPlayer: boolean) => {
      setIsPip(isPipFromPlayer);
    },
    [setIsPip]
  );
  return (
    <Container id="player.story.container">
      <Player {...args} pipMode={isPip} onPipChange={handlePipChange} />
      <Button onClick={() => setIsPip(!isPip)}>
        {isPip ? "Exit" : "Enter"} Picture in Picture
      </Button>
      {Array.from({ length: 10 }).map((_, index) => (
        <p key={index}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      ))}
    </Container>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
};

export const AudioPlayer = Template.bind({});
AudioPlayer.args = {
  ...defaultArgs,
  playerType: "audio",
  url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3",
};

export const AutoPip = TemplateWithParagraphs.bind({});
AutoPip.args = {
  ...defaultArgs,
  pipMode: "auto",
};

export const ButtonPip = TemplateWithButtonForPip.bind({});
ButtonPip.args = {
  ...defaultArgs,
};

export const Streaming = Template.bind({});
Streaming.args = {
  ...defaultArgs,
  url: "https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/db00e97cfb85971e3fa71b7735142e07ab2d1ebf_1605195177.m3u8",
  start: 10,
  end: 20,
};

export const AudioPlayerWithBookmarks = TemplateWithCutter.bind({});
AudioPlayerWithBookmarks.args = {
  ...AudioPlayer.args,
  url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3",
  playerType: "audio",
  bookmarks: [
    {
      id: 1,
      start: 5,
      end: 10,
      hue: theme.colors.successHue,
      tooltipContent: <Tag> Bookmark 1</Tag>,
    },
    {
      id: 2,
      start: 15,
      end: 20,
      hue: theme.colors.dangerHue,
      tooltipContent: <Tag> Bookmark 2</Tag>,
    },
  ],
  handleBookmarkUpdate: (bookmark: IBookmark) => {
    console.log("Bookmark updated", bookmark);
  },
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
      end: 28,
      hue: theme.colors.dangerHue,
      tooltipContent: <Tag> Test Observation</Tag>,
    },
    {
      id: 3,
      start: 25,
      end: 38,
      hue: theme.colors.neutralHue,
      tooltipContent: <Tag>20s - 28s (click me)</Tag>,
      onClick: () => {
        alert("you clicked me! 😳");
      },
    },
    {
      id: 4,
      start: 60,
      end: 65,
      hue: theme.colors.successHue,
      tooltipContent: <Tag>30s - 35s</Tag>,
    },
    {
      id: 5,
      start: 50,
      end: 70,
      hue: theme.colors.dangerHue,
      tooltipContent: <Tag>40s - 60s</Tag>,
    },
    {
      id: 6,
      start: 120,
      end: 170,
      hue: theme.colors.chromeHue,
      tooltipContent: <Tag>110s - 160s</Tag>,
    },
  ],
  handleBookmarkUpdate: (bookmark: IBookmark) => {
    console.log("Bookmark updated", bookmark);
  },
};

export const WithContext = TemplateWithContext.bind({});
WithContext.args = {
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
  parameters: {
    chromatic: { delay: 300 },
  },
} as Meta<typeof Player>;
