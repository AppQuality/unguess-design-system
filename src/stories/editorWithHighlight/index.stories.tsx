import { Meta, StoryFn } from "@storybook/react";
import { useEffect, useState } from "react";
import { EditorWithHighlight } from ".";
import { paragraphs } from "./_data";

type StoryArgs = {};

const Template: StoryFn<StoryArgs> = (args) => {
  const [observations, setObservations] = useState([
    {
      id: 1,
      type: "title",
      start: 1.1999999,
      end: 5.2799997,
      text: "My observation",
    },
    {
      id: 2,
      type: "title",
      start: 4.56,
      end: 10.175,
      text: "My other observation",
    },
  ]);
  const editor = EditorWithHighlight.useEditor({
    currentTime: 3600,
    observations,
    content: paragraphs,
  });

  if (!editor) return <></>;

  return (
    <>
      <EditorWithHighlight.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation("type", "title");
        }}
      />
      <EditorWithHighlight {...args} editor={editor} />;
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

const RunningTemplate: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalTime = 300;
  const editor = EditorWithHighlight.useEditor({
    currentTime,
    content: paragraphs,
    onSetCurrentTime: (time) => setCurrentTime(time * 1000),
  });

  // Increase currentTime every second
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
      <EditorWithHighlight.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation("type", "title");
        }}
      />
      <EditorWithHighlight {...args} editor={editor} />
    </>
  );
};

export const Running = RunningTemplate.bind({});
Running.args = {};

const FakeRunningTemplate: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalTime = 300;
  const editor = EditorWithHighlight.useEditor({
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
      <EditorWithHighlight.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation("type", "title");
        }}
      />
      <EditorWithHighlight.Search editor={editor} />
      <EditorWithHighlight {...args} editor={editor} />
    </>
  );
};

export const FakeRunning = FakeRunningTemplate.bind({});
FakeRunning.args = {};

const WithSearchTemplate: StoryFn<StoryArgs> = (args) => {
  const editor = EditorWithHighlight.useEditor({
    currentTime: 3600,
    content: paragraphs,
  });

  if (!editor) return <></>;
  return (
    <>
      <EditorWithHighlight.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation("type", "title");
        }}
      />
      <EditorWithHighlight.Search editor={editor} />
      <EditorWithHighlight {...args} editor={editor} />
    </>
  );
};

export const WithSearch = WithSearchTemplate.bind({});
WithSearch.args = {};

const WithTranslationTemplate: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);
  const editor = EditorWithHighlight.useEditor({
    currentTime,
    content: paragraphs,
    translations: paragraphs.flatMap((paragraph) => paragraph.sentences),
    onSetCurrentTime: (time) => setCurrentTime(time * 1000),
  });

  if (!editor) return <></>;
  return (
    <>
      <EditorWithHighlight.FloatingMenu
        editor={editor}
        onClick={(editor) => {
          editor.commands.addObservation("type", "title");
        }}
      />
      <EditorWithHighlight {...args} editor={editor} />
    </>
  );
};

export const WithTranslation = WithTranslationTemplate.bind({});
WithTranslation.args = {};

export default {
  title: "Molecules/EditorWithHighlight",
  component: EditorWithHighlight,
} as Meta;
