import { NodeType } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { getTheme } from "../../extensions/theme";

function findAllAncestorsOfType(
  state: EditorState,
  pos: number,
  nodeType: NodeType
): PMNode[] {
  const ancestors: PMNode[] = [];
  let { doc } = state;
  let currentPos = pos;

  while (currentPos > 0) {
    const resolvedPos = doc.resolve(currentPos);
    const parent = resolvedPos.node(resolvedPos.depth);

    if (parent.type === nodeType) {
      ancestors.push(parent);
    }
    if (resolvedPos.depth === 0) {
      break;
    }

    currentPos = resolvedPos.before(); // Move to the previous depth level
  }

  return ancestors;
}

export const Component = ({
  node,
  editor,
  getPos,
}: {
  node: PMNode;
  editor: Editor;
  getPos: () => number | undefined;
}) => {
  const themeExtension = getTheme(editor);
  const ObservationWrapper = themeExtension.options.observationWrapper;

  // The position comes from the node view, not from looking the node up in the
  // current document: when the document is replaced in place the lookup can
  // fail for a render, and a missing node would drop the words it wraps.
  const nodePos = getPos();
  const ancestors =
    nodePos !== undefined && nodePos <= editor.state.doc.content.size
      ? findAllAncestorsOfType(
          editor.state,
          nodePos,
          editor.state.schema.nodes.Observation
        )
      : [];

  const observationsNodes = ancestors.length ? [node, ...ancestors] : [node];

  return (
    <NodeViewWrapper as="div" style={{ display: "inline" }}>
      {/* @ts-ignore */}
      <ObservationWrapper
        title={node.attrs["title"]}
        color={node.attrs["color"]}
        observations={observationsNodes.map((o) => ({
          start: o.attrs["start"],
          id: o.attrs["id"],
          title: o.attrs["title"],
          color: o.attrs["color"],
          creatorType: o.attrs["creatorType"],
          end: o.attrs["end"],
        }))}
      >
        {/* @ts-ignore */}
        <NodeViewContent as="span" className="content is-editable" />
      </ObservationWrapper>
    </NodeViewWrapper>
  );
};
