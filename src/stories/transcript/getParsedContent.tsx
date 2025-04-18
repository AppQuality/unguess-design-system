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
export type SentimentType = {
  start: number;
  end: number;
  value: number;
  text: string;
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
  color?: `#${string}`;
};

export class ContentParser {
  private observations?: ObservationType[];
  private translations?: SentenceType[];
  private sentiments?: SentimentType[];
  private numberOfSpeakers: number | null = null;

  constructor({
    observations,
    translations,
    sentiments,
    numberOfSpeakers,
  }: {
    observations?: ObservationType[];
    translations?: SentenceType[];
    sentiments?: SentimentType[];
    numberOfSpeakers?: number;
  }) {
    this.observations = observations;
    this.translations = translations;
    this.sentiments = sentiments;
    if (numberOfSpeakers) {
      this.numberOfSpeakers = numberOfSpeakers;
    }
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
            start: observation.start,
            end: observation.end,
            id: observation.id,
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
    const s = this.translations?.filter(
      (sentence) =>
        sentence.start >= paragraph.start && sentence.end <= paragraph.end
    );
    const paragraphSentiment = this.sentiments?.find(
      (sentiment) =>
        sentiment.start >= paragraph.start && sentiment.end <= paragraph.end
    );
    return {
      type: "Paragraph",
      attrs: {
        totalSpeakers: this.numberOfSpeakers,
        speaker: paragraph.speaker,
        start: paragraph.start,
        end: paragraph.end,
        sentences: s,
        sentiment: paragraphSentiment,
      },
      content: paragraph.words.map((word) => this.getParsedWord(word)),
    };
  }

  public getParsedContent(content?: ParagraphType[]) {
    if (!content) return undefined;

    return {
      type: "doc",
      content: content.map((paragraph) => this.getParsedParagraph(paragraph)),
    } as TipTapContent;
  }
}
