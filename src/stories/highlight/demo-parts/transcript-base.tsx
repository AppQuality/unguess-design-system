import { Highlight } from "..";
import { StoryArgs } from "../index.stories";
import { DemoTranscript as demo } from "./data";

export const Transcript = (args: StoryArgs & { currentTime: number; offset: number  }) => {
  const words = demo.results.channels[0].alternatives[0].words.map((w) => ({
    word: w.punctuated_word,
    start: w.start,
    end: w.end,
    speaker: w.speaker,
  }));

  return (
    <Highlight {...args}>
      {words.map((item, index) => (
        <>
          <Highlight.Word
            key={index}
            start={item.start}
            end={item.end}
            currentTime={args.currentTime}
            text={item.word}
          />
        </>
      ))}
    </Highlight>
  );
};
