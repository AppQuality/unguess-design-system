import { NodeType } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import {
  Editor,
  NodeViewContent,
  NodeViewWrapper,
  useEditorState,
} from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { observationResizePluginKey } from "../../extensions/observationResize";
import { getTheme } from "../../extensions/theme";

function findNodePosition(doc: PMNode, targetNode: PMNode): number | null {
  let foundPos: number | null = null;

  doc.descendants((node, pos) => {
    if (node === targetNode) {
      foundPos = pos;
      return false; // Interrompe la ricerca
    }
    return true;
  });

  return foundPos;
}

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
}: {
  node: PMNode;
  editor: Editor;
}) => {
  const themeExtension = getTheme(editor);
  const ObservationWrapper = themeExtension.options.observationWrapper;

  // re-render quando cambia l'observation in modifica, anche senza modifiche
  // al documento
  const editingId = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      observationResizePluginKey.getState(e.state)?.editingId ?? null,
  });
  const isResizing = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      observationResizePluginKey.getState(e.state)?.isResizing ?? false,
  });

  const nodePos = findNodePosition(editor.state.doc, node);
  if (!nodePos) return null;

  const isEditing = editingId !== null && node.attrs["id"] === editingId;

  const ancestors = findAllAncestorsOfType(
    editor.state,
    nodePos,
    editor.state.schema.nodes.Observation
  );

  const observationsNodes = ancestors.length ? [node, ...ancestors] : [node];

  return (
    <NodeViewWrapper as="div" style={{ display: "inline" }}>
      {/* @ts-ignore */}
      <ObservationWrapper
        title={node.attrs["title"]}
        color={node.attrs["color"]}
        isEditing={isEditing}
        isDimmed={editingId !== null && !isEditing}
        isResizing={isResizing}
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
