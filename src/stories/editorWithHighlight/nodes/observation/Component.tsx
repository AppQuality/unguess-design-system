import { NodeType } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import { Editor, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Tooltip } from "../../../tooltip";

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
  const background = node.attrs["color"] + "50";

  const nodePos = findNodePosition(editor.state.doc, node);
  if (!nodePos) return null;

  const ancestors = findAllAncestorsOfType(
    editor.state,
    nodePos,
    editor.state.schema.nodes.Observation
  );

  const title = ancestors.length
    ? [node, ...ancestors].map((ancestor) => ancestor.attrs["title"])
    : [node.attrs["title"]];

  return (
    <NodeViewWrapper as="span" className="react-component">
      <span data-title={node.attrs["title"]} style={{ background }}>
        <Tooltip content={title.join(" and ")}>
          <span>
            <NodeViewContent as="span" className="content is-editable" />
          </span>
        </Tooltip>
      </span>
    </NodeViewWrapper>
  );
};
