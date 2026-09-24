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
import { ObservationRange } from "./extensions/observationResize";
import { Theme } from "./extensions/theme";
import {
  ObservationType,
  ParagraphType,
  SentenceType,
  SentimentType,
} from "./getParsedContent";
import { paragraphs } from "./_data";

type StoryArgs = {
  currentTime?: number;
  content?: ParagraphType[];
  observations?: ObservationType[];
  translations?: SentenceType[];
  onAddObservation?: (editor: Editor) => void;
  onSetCurrentTime?: (
    setCurrentTime: (time: number) => void
  ) => (time: number) => void;
  showSearch?: boolean;
  themeExtension?: typeof Theme;
  isEditable?: boolean;
  sentiment?: SentimentType[];
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
    sentiments: args.sentiment,
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
      creatorType: "human",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      text: "My other observation",
      creatorType: "ai",
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

export const WithSentiment = Template.bind({});
WithSentiment.args = {
  currentTime: 3600,
  content: paragraphs,
  sentiment: paragraphs.map((paragraph) => ({
    start: paragraph.start,
    end: paragraph.end,
    value: 1 + (paragraph.text.length % 5),
    text: paragraph.text,
  })),
  observations: [
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      text: "My observation",
      color: "#ff0000",
      creatorType: "human",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      text: "My other observation",
      creatorType: "ai",
    },
  ],
  onAddObservation: (editor) =>
    editor.commands.addObservation({
      id: Math.floor(Math.random() * 1000),
      title: "title",
    }),
};

const ParagraphContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
  .paragraph-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export const WithCustomTheme = Template.bind({});
WithCustomTheme.args = {
  currentTime: 0,
  content: paragraphs,

  sentiment: paragraphs.map((paragraph) => ({
    start: paragraph.start,
    end: paragraph.end,
    value: 1 + (paragraph.text.length % 5),
    text: paragraph.text,
  })),
  observations: [
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      color: "#ff0000",
      text: "My observation",
      creatorType: "human",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      color: "#00ff00",
      text: "My other observation",
      creatorType: "ai",
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
      return <ParagraphContainer>{children}</ParagraphContainer>;
    },
    speakerWrapper: ({ start, end, setCurrentTime, speaker }) => {
      return (
        <div>
          Speaker {speaker + 1} ({start} - {end}){" "}
          <IconButton
            onClick={() => {
              setCurrentTime && setCurrentTime({ start, end });
            }}
            size={"small"}
          >
            <PlayIcon />
          </IconButton>
        </div>
      );
    },
    sentencesWrapper: ({ children }) => {
      return (
        <div
          style={{
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
    sentimentWrapper: ({ value, text }) => {
      return (
        <Tag hue="red" color="white" title={text}>
          {value}
        </Tag>
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

const ResizableObservationTemplate: StoryFn<StoryArgs> = (args) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [liveRange, setLiveRange] = useState<ObservationRange>();
  const [committedRange, setCommittedRange] = useState<ObservationRange>();
  const editor = Transcript.useEditor({
    content: args.content,
    observations: args.observations,
    editingObservationId: editingId,
    onObservationRangeChange: setLiveRange,
    onObservationRangeCommit: setCommittedRange,
    // click su un highlight: seleziona la più corta, un altro click sulla
    // stessa parola passa alla successiva sovrapposta
    onObservationClick: ({ observations }) =>
      setEditingId((current) => {
        const index = observations.findIndex((o) => o.id === current);
        if (index === -1) return observations[0].id;
        return observations[(index + 1) % observations.length].id;
      }),
  });

  if (!editor) return <></>;

  return (
    <>
      <div>
        Editing: {editingId ?? "none"}{" "}
        <button onClick={() => setEditingId(null)} disabled={editingId === null}>
          Stop editing
        </button>
      </div>
      <pre>
        Live: {JSON.stringify(liveRange)}
        {"\n"}
        Committed: {JSON.stringify(committedRange)}
      </pre>
      <Transcript.FloatingMenu
        editor={editor}
        onClick={(ed) => {
          const id = Math.floor(Math.random() * 1000) + 100;
          ed.commands.addObservation({ id, title: "New observation" });
          // come setOpenAccordion(res.id) nell'app
          setEditingId(id);
        }}
      />
      <Transcript editor={editor} />
    </>
  );
};

export const ResizableObservation = ResizableObservationTemplate.bind({});
ResizableObservation.args = {
  content: paragraphs,
  observations: [
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      text: "My observation",
      color: "#ff0000",
      creatorType: "human",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      text: "My other observation",
      creatorType: "ai",
    },
  ],
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
