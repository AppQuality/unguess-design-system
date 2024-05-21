import { styled } from "styled-components";
import { Highlight } from "..";
import { formatDuration } from "../../player/utils";
import { SM } from "../../typography/typescale";
import { StoryArgs } from "../index.stories";
import { DemoTranscript as demo, DemoSentiment } from "./data";
import { getSentiment } from "./sentiment-tag";
import { Textarea } from "../../forms/textarea";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const TSentiment = (
  args: StoryArgs & { currentTime: number; offset: number }
) => {
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
      sentiment: w.sentiment,
    }));
  return (
    <Highlight {...args}>
      Overall: 4 - Positive
      <Textarea
        readOnly
        disabled
        style={{ margin: 0 }}
        value={DemoSentiment.content}
        rows={4}
      />
      <br />
      <br />
      {paragraphs.map((p, index) => (
        <div style={{ marginBottom: "8px" }}>
          <StyledDiv>
            <SM>
              <b>{p.speaker === 1 ? "Tester" : "Interviewer"}</b>&nbsp; (
              {formatDuration(p.start - args.offset)} -{" "}
              {formatDuration(p.end - args.offset)})
            </SM>
            {p.sentiment && getSentiment(p.sentiment).text}
          </StyledDiv>
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
