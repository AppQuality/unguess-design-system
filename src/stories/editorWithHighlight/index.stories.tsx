import { Meta, StoryFn } from "@storybook/react";
import { useEffect, useState } from "react";
import { EditorWithHighlight } from ".";
import { paragraphs } from "./_data";

type StoryArgs = {};

const Template: StoryFn<StoryArgs> = (args) => {
  return (
    <EditorWithHighlight {...args} content={paragraphs} currentTime={10} />
  );
};

export const Default = Template.bind({});
Default.args = {};

const RunningTemplate: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);

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
        return currentTime + 300;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      Time: {currentTime}
      <EditorWithHighlight
        {...args}
        content={paragraphs}
        currentTime={currentTime}
      />
    </>
  );
};

export const Running = RunningTemplate.bind({});
Running.args = {};

export default {
  title: "Molecules/EditorWithHighlight",
  component: EditorWithHighlight,
} as Meta;
