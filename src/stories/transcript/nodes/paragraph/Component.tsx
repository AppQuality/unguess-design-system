import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { getTheme } from "../../extensions/theme";
import { findActiveWord } from "../../findActiveWord";

const Content = ({ node, editor }: { node: PMNode; editor: Editor }) => {
  const themeExtension = getTheme(editor);
  const ParagraphWrapper = themeExtension.options.paragraphWrapper;
  const SpeakerWrapper = themeExtension.options.speakerWrapper;
  return (
    <ParagraphWrapper>
      <SpeakerWrapper
        setCurrentTime={({ start }) => {
          editor.commands.setCurrentTime(start);
        }}
        start={node.attrs.start}
        end={node.attrs.end}
        speaker={node.attrs.speakername}
      />
      <NodeViewContent className="content is-editable" />
    </ParagraphWrapper>
  );
};

export const Component = ({
  node,
  editor,
}: {
  node: PMNode;
  editor: Editor;
}) => {
  if (!node.attrs.sentences || node.attrs.sentences.length === 0) {
    return (
      <NodeViewWrapper className="react-component">
        <Content node={node} editor={editor} />
      </NodeViewWrapper>
    );
  }
  const themeExtension = getTheme(editor);
  const SentencesWrapper = themeExtension.options.sentencesWrapper;
  const SentenceWrapper = themeExtension.options.sentenceWrapper;
  const TranslationWrapper = themeExtension.options.translationWrapper;
  const activeWord = findActiveWord(node);

  return (
    <NodeViewWrapper className="react-component">
      {
        <TranslationWrapper
          content={<Content node={node} editor={editor} />}
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
      }
    </NodeViewWrapper>
  );
};
