import { Editor, Extension } from "@tiptap/react";
import { ReactNode } from "react";
import { styled } from "styled-components";
import { Tooltip } from "../../../tooltip";

const DefaultActiveWrapper = ({ children }: { children: ReactNode }) => {
  return <span style={{ background: "#ff0000" }}>{children}</span>;
};

const DefaultWordWrapper = ({ children }: { children: ReactNode }) => {
  return <span>{children}</span>;
};

const DefaultObservationWrapper = ({
  title,
  color,
  children,
  observations,
}: {
  title: string;
  color: string;
  children: ReactNode;
  observations: { title: string; color: string }[];
}) => {
  const background = color + "50";
  return (
    <span data-title={title} style={{ background }}>
      <Tooltip content={observations.map((o) => o.title).join(" and ")}>
        <span>{children}</span>
      </Tooltip>
    </span>
  );
};

const DefaultParagraphWrapper = ({ children }: { children: ReactNode }) => {
  return <p style={{ marginBottom: "20px" }}>{children}</p>;
};

const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  if (seconds < 3600) return date.toISOString().substring(14, 19);
  return date.toISOString().substring(11, 19);
};

const DefaultSpeakerWrapper = ({
  start,
  end,
  setCurrentTime,
  speaker,
}: {
  start: number;
  end: number;
  setCurrentTime?: ({ start, end }: { start: number; end: number }) => void;
  speaker: string;
}) => {
  return (
    <p
      style={{
        marginBottom: "10px",
        userSelect: "none",
      }}
      onClick={() => {
        setCurrentTime && setCurrentTime({ start, end });
      }}
      contentEditable={false}
    >
      {speaker} ({formatTime(start)} - {formatTime(end)})
    </p>
  );
};

const DefaultSentencesWrapper = ({ children }: { children: ReactNode }) => {
  return <div style={{ paddingTop: "30px" }}>{children}</div>;
};

const DefaultSentenceWrapper = ({
  setCurrentTime,
  children,
  start,
  end,
  isActive,
}: {
  setCurrentTime?: ({ start, end }: { start: number; end: number }) => void;
  children: ReactNode;
  start: number;
  end: number;
  isActive?: boolean;
}) => {
  return (
    <span
      onClick={() => {
        setCurrentTime && setCurrentTime({ start, end });
      }}
      style={
        isActive
          ? {
              backgroundColor: "yellow",
            }
          : {}
      }
    >
      {children}
    </span>
  );
};

const DefaultTranslationWrapper = ({
  content,
  translations,
}: {
  content: ReactNode;
  translations: ReactNode;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>{content}</div>
      <div style={{ width: "50%" }}>{translations}</div>
    </div>
  );
};

const SearchStyleWrapper = styled.span`
  .search-result {
    background-color: rgba(255, 217, 0, 0.5);

    &-current {
      background-color: rgba(13, 255, 0, 0.5);
    }
  }
`;

export interface ThemeOptions {
  activeWrapper: typeof DefaultActiveWrapper;
  wordWrapper: typeof DefaultWordWrapper;
  observationWrapper: typeof DefaultObservationWrapper;
  paragraphWrapper: typeof DefaultParagraphWrapper;
  speakerWrapper: typeof DefaultSpeakerWrapper;
  sentencesWrapper: typeof DefaultSentencesWrapper;
  sentenceWrapper: typeof DefaultSentenceWrapper;
  translationWrapper: typeof DefaultTranslationWrapper;
  /**
   * Allow styling search results
   * @example
   * ```jsx
   * styled.span`
   *   .search-result {
   *    background-color: rgba(0, 0, 255, 0.5);
   *
   *     &-current {
   *       background-color: rgba(255, 255, 0, 0.5);
   *     }
   *   }
   * `
   * ```
   */
  searchStyleWrapper: typeof SearchStyleWrapper;
}

export const Theme = Extension.create<ThemeOptions, {}>({
  name: "theme",

  addOptions() {
    return {
      activeWrapper: DefaultActiveWrapper,
      wordWrapper: DefaultWordWrapper,
      observationWrapper: DefaultObservationWrapper,
      paragraphWrapper: DefaultParagraphWrapper,
      speakerWrapper: DefaultSpeakerWrapper,
      sentencesWrapper: DefaultSentencesWrapper,
      sentenceWrapper: DefaultSentenceWrapper,
      translationWrapper: DefaultTranslationWrapper,
      searchStyleWrapper: SearchStyleWrapper,
    };
  },
});

export const getTheme = (editor: Editor) => {
  const themeExtension = editor.extensionManager.extensions.find(
    (ext) => ext.name === "theme"
  ) as typeof Theme;

  if (!themeExtension) {
    throw new Error("Theme extension not found");
  }

  return themeExtension;
};
