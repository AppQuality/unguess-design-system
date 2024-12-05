import { Meta, StoryFn } from "@storybook/react";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Transcript } from ".";
import { ReactComponent as BadgeIcon } from "../../assets/icons/check-badge-stroke.svg";
import { ReactComponent as PlayIcon } from "../../assets/icons/play-fill.svg";
import { IconButton } from "../buttons/icon-button";
import { Tag } from "../tags";
import { Tooltip } from "../tooltip";
import { paragraphs } from "./_data";
import { Theme } from "./extensions/theme";
import {
  ObservationType,
  ParagraphType,
  SentenceType,
} from "./getParsedContent";

type StoryArgs = {
  currentTime?: number;
  content?: ParagraphType[];
  observations?: ObservationType[];
  translations?: SentenceType[];
  onAddObservation?: (editor: Editor) => void;
  onSetCurrentTime?: (
    setCurrentTime: (time: number) => void,
  ) => (time: number) => void;
  showSearch?: boolean;
  themeExtension?: typeof Theme;
  isEditable?: boolean;
};

const Template: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(args.currentTime);
  const editor = Transcript.useEditor({
    themeExtension: args.themeExtension,
    currentTime: currentTime,
    content: args.content,
    translations: args.translations,
    isEditable: args.isEditable,
    observations: args.observations,
    onSetCurrentTime: args.onSetCurrentTime
      ? args.onSetCurrentTime(setCurrentTime)
      : undefined,
    numberOfSpeakers: 1,
  });

  if (!editor) return <></>;

  return (
    <>
      {args.onAddObservation && (
        <Transcript.FloatingMenu
          editor={editor}
          onClick={args.onAddObservation}
        />
      )}
      {args.showSearch && <Transcript.Search editor={editor} />}
      <Transcript {...args} editor={editor} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  currentTime: 3600,
  content: paragraphs,
  observations: [
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      text: "My observation",
      color: "#ff0000",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      text: "My other observation",
    },
  ],
  onAddObservation: (editor) =>
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
    }),
};

const RunningTemplate: StoryFn<{}> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalTime = 300;
  const editor = Transcript.useEditor({
    currentTime,
    content: paragraphs,
    onSetCurrentTime: (time) => setCurrentTime(time * 1000),
  });

  useEffect(() => {
    const lastParagraph = paragraphs[paragraphs.length - 1];
    const lastWord = lastParagraph.words[lastParagraph.words.length - 1];
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => {
        if (currentTime >= lastWord.end * 1000) {
          clearInterval(interval);
          return 0;
        }
        return currentTime + intervalTime;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  if (!editor) return <></>;

  return (
    <>
      Time: {currentTime}
      <Transcript.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation({
            id: Math.floor(Math.random() * 1000),
            title: "title",
          });
        }}
      />
      <Transcript {...args} editor={editor} />
    </>
  );
};

export const Running = RunningTemplate.bind({});
Running.args = {};

const FakeRunningTemplate: StoryFn<StoryArgs> = (args, context) => {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalTime = 300;
  const editor = Transcript.useEditor({
    currentTime,
    content: paragraphs,
    onSetCurrentTime: (time) => setCurrentTime(time * 1000),
  });

  if (!editor) return <></>;

  return (
    <>
      Time: {currentTime}
      <button onClick={() => setCurrentTime(currentTime + intervalTime)}>
        Next
      </button>
      <Transcript.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation({
            id: Math.floor(Math.random() * 1000),
            title: "title",
          });
        }}
      />
      <Transcript {...args} editor={editor} />
    </>
  );
};

export const FakeRunning = FakeRunningTemplate.bind({});
FakeRunning.args = {};

export const WithSearch = Template.bind({});
WithSearch.args = {
  currentTime: 3600,
  content: paragraphs,
  showSearch: true,
  onAddObservation: (editor) =>
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
    }),
};

export const WithTranslation = Template.bind({});
WithTranslation.args = {
  currentTime: 0,
  content: paragraphs,
  translations: paragraphs.flatMap((paragraph) => paragraph.sentences),
  onAddObservation: (editor) =>
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
    }),
  onSetCurrentTime: (setCurrentTime) => (time) => setCurrentTime(time * 1000),
};

export const MultipleColorObservations = Template.bind({});
MultipleColorObservations.args = {
  currentTime: 0,
  content: paragraphs,
  onAddObservation: (editor) => {
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
      color,
    });
  },
  onSetCurrentTime: (setCurrentTime) => (time) => setCurrentTime(time * 1000),
};

export const WithCustomTheme = Template.bind({});
WithCustomTheme.args = {
  currentTime: 0,
  content: paragraphs,

  observations: [
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      color: "#ff0000",
      text: "My observation",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      color: "#00ff00",
      text: "My other observation",
    },
  ],
  onAddObservation: (editor) => {
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
    });
  },
  showSearch: true,
  onSetCurrentTime: (setCurrentTime) => (time) => setCurrentTime(time * 1000),
  translations: paragraphs.flatMap((paragraph) => paragraph.sentences),
  themeExtension: Theme.configure({
    activeWrapper: ({ children }) => {
      return (
        <span style={{ background: "blue", color: "white" }}>{children}</span>
      );
    },
    observationWrapper: ({ title, color, children, observations }) => {
      const background = color + "50";
      return (
        <span
          data-title={title}
          style={{
            background: `color-mix(in srgb, ${background}, #ffffff 50%)`,
            padding: "0 0.2em",
          }}
        >
          <Tooltip
            isTransparent
            content={
              <>
                {observations.map((o) => (
                  <div>
                    <Tag hue={o.color} color="white">
                      #{JSON.stringify(o)} - {o.title}
                    </Tag>
                  </div>
                ))}
              </>
            }
          >
            <span>{children}</span>
          </Tooltip>
        </span>
      );
    },
    paragraphWrapper: ({ children }) => {
      return (
        <p
          style={{
            paddingBottom: "10px",
            borderBottom: "1px solid",
            marginBottom: "10px",
          }}
        >
          {children}
        </p>
      );
    },
    speakerWrapper: ({ start, end, setCurrentTime, speaker }) => {
      return (
        <p>
          Speaker {speaker + 1} ({start} - {end}){" "}
          <IconButton
            onClick={() => {
              setCurrentTime && setCurrentTime({ start, end });
            }}
            size={"small"}
          >
            <PlayIcon />
          </IconButton>
        </p>
      );
    },
    sentencesWrapper: ({ children }) => {
      return (
        <div
          style={{
            paddingTop: "32px",
            paddingBottom: "10px",
            borderLeft: "1px solid red",
          }}
        >
          {children}
        </div>
      );
    },
    sentenceWrapper: ({ start, end, setCurrentTime, children, isActive }) => {
      return (
        <span
          onClick={() => {
            setCurrentTime && setCurrentTime({ start, end });
          }}
          style={
            isActive
              ? {
                  backgroundColor: "purple",
                  color: "white",
                }
              : {}
          }
        >
          {isActive ? <BadgeIcon /> : null} {children}
        </span>
      );
    },

    translationWrapper: ({ content, translations }) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%" }}>{content}</div>
          <div style={{ width: "40%" }}>{translations}</div>
        </div>
      );
    },
    searchStyleWrapper: styled.span`
      .search-result {
        background-color: rgba(0, 0, 255, 0.5);

        &-current {
          background-color: rgba(255, 255, 0, 0.5);
        }
      }
    `,
  }),
};

export default {
  title: "Molecules/Transcript",
  component: Transcript,
  argTypes: {
    isEditable: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;
