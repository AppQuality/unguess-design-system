import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { getTheme } from "../../extensions/theme";
import { findActiveWord } from "../../findActiveWord";

const Content = ({ node, editor }: { node: PMNode; editor: Editor }) => {
  const themeExtension = getTheme(editor);
  const ParagraphWrapper = themeExtension.options.paragraphWrapper;
  return (
    <ParagraphWrapper>
      <TopBar node={node} editor={editor} />
      <NodeViewContent className="content is-editable" />
    </ParagraphWrapper>
  );
};

const TopBar = ({ node, editor }: { node: PMNode; editor: Editor }) => {
  const themeExtension = getTheme(editor);
  const SentimentWrapper = themeExtension.options.sentimentWrapper;
  const SpeakerWrapper = themeExtension.options.speakerWrapper;

  return (
    <div className="paragraph-topbar">
      <SpeakerWrapper
        setCurrentTime={({ start }) => {
          editor.commands.setCurrentTime(start);
        }}
        start={node.attrs.start}
        end={node.attrs.end}
        speaker={node.attrs.speaker}
        totalSpeakers={node.attrs.totalSpeakers}
      />
      {node.attrs.sentiment && (
        <div className="paragraph-sentiment">
          <SentimentWrapper {...node.attrs.sentiment} />
        </div>
      )}
    </div>
  );
};

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  const themeExtension = getTheme(editor);
  const ParagraphWrapper = themeExtension.options.paragraphWrapper;
  if (!node.attrs.sentences || node.attrs.sentences.length === 0) {
    return (
      <NodeViewWrapper as="div" style={{ display: "inline" }}>
        <ParagraphWrapper>
          <TopBar node={node} editor={editor} />
          <NodeViewContent className="content is-editable" />
        </ParagraphWrapper>
      </NodeViewWrapper>
    );
  }
  const SentencesWrapper = themeExtension.options.sentencesWrapper;
  const SentenceWrapper = themeExtension.options.sentenceWrapper;
  const TranslationWrapper = themeExtension.options.translationWrapper;
  const activeWord = findActiveWord(node);

  return (
    <NodeViewWrapper className="react-component">
      <ParagraphWrapper>
        <TopBar node={node} editor={editor} />
        <TranslationWrapper
          content={<NodeViewContent className="content is-editable" />}
          translations={
            <SentencesWrapper>
              {node.attrs.sentences.map(
                (
                  sentence: { text: string; start: number; end: number },
                  index: number
                ) => (
                  <>
                    <SentenceWrapper
                      start={sentence.start}
                      end={sentence.end}
                      setCurrentTime={({ start, end }) => {
                        editor.commands.setCurrentTime(start);
                      }}
                      key={index}
                      isActive={
                        activeWord
                          ? activeWord.attrs["data-start"] >= sentence.start &&
                            activeWord.attrs["data-end"] <= sentence.end
                          : false
                      }
                    >
                      {sentence.text}{" "}
                    </SentenceWrapper>
                  </>
                )
              )}
            </SentencesWrapper>
          }
        />
      </ParagraphWrapper>
    </NodeViewWrapper>
  );
};
