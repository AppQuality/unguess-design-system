import { Content as TipTapContent } from "@tiptap/core";

export type WordType = {
  start: number;
  end: number;
  word: string;
};

export type ParagraphType = {
  start: number;
  end: number;
  speaker: number;
  words: WordType[];
};

export type ObservationType = {
  id: number;
  type: string;
  start: number;
  end: number;
  text: string;
};

class ContentParser {
  private observations?: ObservationType[];

  constructor(observations?: ObservationType[]) {
    this.observations = observations;
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
          attrs: { type: observation.type, title: observation.text },
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
  observations?: ObservationType[]
) {
  return new ContentParser(observations).getParsedContent(content) as
    | TipTapContent
    | undefined;
}
