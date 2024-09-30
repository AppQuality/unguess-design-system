import { Content as TipTapContent } from "@tiptap/core";

export type WordType = {
  start: number;
  end: number;
  word: string;
};

export type SentenceType = {
  start: number;
  end: number;
  text: string;
};

export type ParagraphType = {
  start: number;
  end: number;
  speaker: number;
  words: WordType[];
  sentences: SentenceType[];
};

export type ObservationType = {
  id: number;
  type: string;
  start: number;
  end: number;
  text: string;
  color?: `#${string}`;
};

class ContentParser {
  private observations?: ObservationType[];
  private sentences?: SentenceType[];

  constructor(observations?: ObservationType[], sentences?: SentenceType[]) {
    this.observations = observations;
    this.sentences = sentences;
  }

  private wrapWordInObservations(word: WordType): TipTapContent {
    const observationsInThisWord = this.observations?.filter(
      (observation) =>
        observation.start <= word.start && observation.end >= word.end
    );

    const textContent = [{ type: "text", text: `${word.word} ` }];

    if (!observationsInThisWord || observationsInThisWord.length === 0) {
      return textContent;
    }

    return observationsInThisWord.reduce(
      (acc: TipTapContent, observation) => [
        {
          type: "Observation",
          attrs: {
            title: observation.text,
            color: observation.color,
          },
          content: acc,
        },
      ],
      textContent
    );
  }

  private getParsedWord(word: WordType) {
    return {
      type: "Word",
      attrs: {
        "data-start": word.start,
        "data-end": word.end,
      },
      content: this.wrapWordInObservations(word),
    };
  }

  private getParsedParagraph(paragraph: ParagraphType) {
    const s = this.sentences?.filter(
      (sentence) =>
        sentence.start >= paragraph.start && sentence.end <= paragraph.end
    );
    return {
      type: "Paragraph",
      attrs: {
        speakername: `Speaker ${paragraph.speaker}`,
        start: paragraph.start,
        end: paragraph.end,
        sentences: s,
      },
      content: paragraph.words.map((word) => this.getParsedWord(word)),
    };
  }

  public getParsedContent(
    content?: ParagraphType[]
  ): { type: "doc"; content: TipTapContent } | undefined {
    if (!content) return undefined;

    return {
      type: "doc",
      content: content.map((paragraph) => this.getParsedParagraph(paragraph)),
    };
  }
}

export function getParsedContent(
  content?: ParagraphType[],
  observations?: ObservationType[],
  sentences?: SentenceType[]
) {
  return new ContentParser(observations, sentences).getParsedContent(
    content
  ) as TipTapContent | undefined;
}
