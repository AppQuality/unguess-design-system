import { Highlight } from "..";
import { formatDuration } from "../../player/utils";
import { SM } from "../../typography/typescale";
import { StoryArgs } from "../index.stories";
import { DemoTranscript as demo } from "./data";

export const TDiarization = (args: StoryArgs & { currentTime: number; offset: number }) => {
  const words = demo.results.channels[0].alternatives[0].words.map((w) => ({
    word: w.punctuated_word,
    start: w.start,
    end: w.end,
    speaker: w.speaker,
  }));
  const paragraphs =
    demo.results.channels[0].alternatives[0].paragraphs.paragraphs.map((w) => ({
      words: words.filter((word) => word.start >= w.start && word.end <= w.end),
      start: w.start,
      end: w.end,
      speaker: w.speaker,
      text: w.sentences.map((s) => s.text).join(" "),
    }));
  return (
    <Highlight {...args}>
      {paragraphs.map((p, index) => (
        <div style={{ marginBottom: "8px" }}>
          <SM>
            <b>{p.speaker === 1 ? "Tester" : "Interviewer"}</b>&nbsp;
            ({formatDuration(p.start - args.offset)} - {formatDuration(p.end - args.offset)})
          </SM>
          {p.words.map((w) => (
            <Highlight.Word
              key={index}
              start={w.start}
              end={w.end}
              currentTime={args.currentTime}
              text={w.word}
            />
          ))}
        </div>
      ))}
    </Highlight>
  );
};
