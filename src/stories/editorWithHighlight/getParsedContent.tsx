import { Content as TipTapContent } from "@tiptap/core";

type Word = {
  start: number;
  end: number;
  word: string;
};

type Paragraph = {
  start: number;
  end: number;
  speaker: number;
  words: Word[];
};

type Observation = {
  id: number;
  type: string;
  start: number;
  end: number;
  text: string;
};

class ContentParser {
  private observations?: Observation[];

  constructor(observations?: Observation[]) {
    this.observations = observations;
  }

  private wrapWordInObservations(word: Word): TipTapContent {
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
          attrs: { type: observation.type, title: observation.text },
          content: acc,
        },
      ],
      textContent
    );
  }

  private getParsedWord(word: Word) {
    return {
      type: "Word",
      attrs: {
        "data-start": word.start,
        "data-end": word.end,
      },
      content: this.wrapWordInObservations(word),
    };
  }

  private getParsedParagraph(paragraph: Paragraph) {
    return {
      type: "Paragraph",
      attrs: {
        speakername: `Speaker ${paragraph.speaker}`,
        start: paragraph.start,
        end: paragraph.end,
      },
      content: paragraph.words.map((word) => this.getParsedWord(word)),
    };
  }

  public getParsedContent(
    content?: Paragraph[]
  ): { type: "doc"; content: TipTapContent } | undefined {
    if (!content) return undefined;

    return {
      type: "doc",
      content: content.map((paragraph) => this.getParsedParagraph(paragraph)),
    };
  }
}

export function getParsedContent(
  content?: Paragraph[],
  observations?: Observation[]
) {
  return new ContentParser(observations).getParsedContent(content) as
    | TipTapContent
    | undefined;
}
