import { Extension } from "@tiptap/core";
import { Fragment, Node as PMNode, Schema } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

/**
 * Maniglie di inizio/fine per ridimensionare un'observation nel transcript.
 *
 * Un'observation non è un nodo unico: ogni Word contiene uno strato
 * Observation per ciascuna observation che la include (vedi
 * getParsedContent). Ridimensionare significa quindi aggiungere/togliere lo
 * strato con quell'id dalle Word che entrano/escono dall'intervallo.
 *
 * Le maniglie sono widget decoration mostrate solo per l'observation in
 * modifica (setEditingObservation). Il trascinamento si aggancia sempre a
 * parole intere e aggiorna il documento in tempo reale.
 */

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    observationResize: {
      setEditingObservation: (id: number | null) => ReturnType;
      setObservationRange: (range: {
        id: number;
        start: number;
        end: number;
      }) => ReturnType;
    };
  }
}

export type ObservationRange = {
  id: number;
  start: number;
  end: number;
  text: string;
};

export type ObservationInfo = {
  id: number;
  title: string;
  color: string;
  start: number;
  end: number;
  creatorType?: "human" | "ai";
};

export type ObservationClickPayload = {
  word: { start: number; end: number };
  /** observation della parola cliccata, dalla più corta alla più lunga */
  observations: ObservationInfo[];
};

export interface ObservationResizeOptions {
  /** chiamata a ogni parola aggiunta/tolta durante il trascinamento */
  onRangeChange?: (range: ObservationRange) => void;
  /** chiamata al rilascio della maniglia, se l'intervallo è cambiato */
  onRangeCommit?: (range: ObservationRange) => void;
  /** chiamata al click su una parola evidenziata */
  onObservationClick?: (payload: ObservationClickPayload) => void;
}

type HandleType = "start" | "end";

type PluginState = {
  editingId: number | null;
  isResizing: boolean;
  decorations: DecorationSet;
};

type ObservationAttrs = Record<string, any>;

type WordInfo = {
  node: PMNode;
  pos: number;
  start: number;
  end: number;
};

export const observationResizePluginKey = new PluginKey<PluginState>(
  "observationResize"
);

const RESIZING_CLASS = "is-resizing-observation";

const toWordInfo = (node: PMNode, pos: number): WordInfo => ({
  node,
  pos,
  start: node.attrs["data-start"],
  end: node.attrs["data-end"],
});

const getWords = (doc: PMNode): WordInfo[] => {
  const words: WordInfo[] = [];
  doc.descendants((node, pos) => {
    if (node.type.name !== "Word") return true;
    words.push(toWordInfo(node, pos));
    return false;
  });
  return words;
};

// scompone il contenuto di una Word negli strati Observation (dal più
// esterno) e nel contenuto interno (testo o Active)
const unwrapObservations = (word: PMNode) => {
  const layers: ObservationAttrs[] = [];
  let content = word.content;
  while (
    content.childCount === 1 &&
    content.firstChild?.type.name === "Observation"
  ) {
    layers.push(content.firstChild.attrs);
    content = content.firstChild.content;
  }
  return { layers, content };
};

const wrapInObservations = (
  schema: Schema,
  layers: ObservationAttrs[],
  content: Fragment
): Fragment =>
  layers.reduceRight<Fragment>(
    (acc, attrs) =>
      Fragment.from(schema.nodes.Observation.create(attrs, acc)),
    content
  );

const findObservation = (doc: PMNode, id: number) => {
  let attrs: ObservationAttrs | undefined;
  const words = getWords(doc).filter((word) => {
    const layer = unwrapObservations(word.node).layers.find(
      (l) => l.id === id
    );
    if (layer && !attrs) attrs = layer;
    return !!layer;
  });
  if (!attrs || !words.length) return null;
  return { attrs, words };
};

const getObservationRange = (
  doc: PMNode,
  id: number
): ObservationRange | null => {
  const observation = findObservation(doc, id);
  if (!observation) return null;
  return {
    id,
    start: observation.attrs.start,
    end: observation.attrs.end,
    text: observation.words
      .map((word) => word.node.textContent)
      .join("")
      .trim(),
  };
};

const findWordAt = (doc: PMNode, pos: number): WordInfo | null => {
  const $pos = doc.resolve(pos);
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === "Word") {
      return toWordInfo($pos.node(depth), $pos.before(depth));
    }
  }
  // posizione tra due Word
  const { nodeAfter, nodeBefore } = $pos;
  if (nodeAfter?.type.name === "Word") return toWordInfo(nodeAfter, pos);
  if (nodeBefore?.type.name === "Word") {
    return toWordInfo(nodeBefore, pos - nodeBefore.nodeSize);
  }
  return null;
};

const toObservationInfo = (attrs: ObservationAttrs): ObservationInfo => ({
  id: attrs.id,
  title: attrs.title,
  color: attrs.color,
  start: attrs.start,
  end: attrs.end,
  creatorType: attrs.creatorType ?? undefined,
});

const buildDecorations = (
  doc: PMNode,
  editingId: number | null,
  onHandleDown: (
    view: EditorView,
    type: HandleType,
    id: number,
    event: PointerEvent
  ) => void
): DecorationSet => {
  if (editingId === null) return DecorationSet.empty;
  const observation = findObservation(doc, editingId);
  if (!observation) return DecorationSet.empty;

  const first = observation.words[0];
  const last = observation.words[observation.words.length - 1];

  const createHandle = (view: EditorView, type: HandleType) => {
    const handle = document.createElement("span");
    handle.className = `transcript-observation-handle transcript-observation-handle-${type}`;
    handle.dataset.handle = type;
    handle.contentEditable = "false";
    const hitArea = document.createElement("span");
    hitArea.className = "transcript-observation-handle-hit-area";
    handle.appendChild(hitArea);
    handle.addEventListener("pointerdown", (event) =>
      onHandleDown(view, type, editingId, event)
    );
    return handle;
  };

  return DecorationSet.create(doc, [
    Decoration.widget(first.pos, (view) => createHandle(view, "start"), {
      side: -1,
      key: `observation-handle-start-${editingId}`,
      ignoreSelection: true,
      stopEvent: () => true,
    }),
    Decoration.widget(
      last.pos + last.node.nodeSize,
      (view) => createHandle(view, "end"),
      {
        side: 1,
        key: `observation-handle-end-${editingId}`,
        ignoreSelection: true,
        stopEvent: () => true,
      }
    ),
  ]);
};

export const ObservationResize = Extension.create<ObservationResizeOptions>({
  name: "observationResize",

  addOptions() {
    return {
      onRangeChange: undefined,
      onRangeCommit: undefined,
      onObservationClick: undefined,
    };
  },

  addCommands() {
    return {
      setEditingObservation:
        (id: number | null) =>
        ({ tr, dispatch }) => {
          if (dispatch) tr.setMeta(observationResizePluginKey, { editingId: id });
          return true;
        },
      setObservationRange:
        ({ id, start, end }: { id: number; start: number; end: number }) =>
        ({ tr, state, dispatch }) => {
          if (start > end) return false;
          const observation = findObservation(tr.doc, id);
          if (!observation) return false;
          if (!dispatch) return true;

          const words = getWords(tr.doc);
          // dall'ultima alla prima, così le posizioni precedenti restano valide
          for (let i = words.length - 1; i >= 0; i--) {
            const word = words[i];
            const { layers, content } = unwrapObservations(word.node);
            const index = layers.findIndex((l) => l.id === id);
            // stessa regola di ContentParser.wrapWordInObservations
            const inRange = start <= word.start && end >= word.end;

            let nextLayers: ObservationAttrs[];
            if (index === -1) {
              if (!inRange) continue;
              nextLayers = [{ ...observation.attrs, start, end }, ...layers];
            } else if (!inRange) {
              nextLayers = layers.filter((_, j) => j !== index);
            } else {
              const layer = layers[index];
              if (layer.start === start && layer.end === end) continue;
              nextLayers = layers.map((l, j) =>
                j === index ? { ...l, start, end } : l
              );
            }

            tr.replaceWith(
              word.pos,
              word.pos + word.node.nodeSize,
              word.node.copy(
                wrapInObservations(state.schema, nextLayers, content)
              )
            );
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const { editor, options } = this;
    // il browser genera un click dopo il rilascio della maniglia: va ignorato
    let suppressClick = false;

    const setResizing = (view: EditorView, isResizing: boolean) => {
      if (editor.isDestroyed) return;
      view.dispatch(
        view.state.tr.setMeta(observationResizePluginKey, { isResizing })
      );
    };

    const onHandleDown = (
      view: EditorView,
      type: HandleType,
      id: number,
      event: PointerEvent
    ) => {
      // niente click sulla Word (setCurrentTime), selezione o BubbleMenu
      event.preventDefault();
      event.stopPropagation();

      let changed = false;
      view.dom.classList.add(RESIZING_CLASS);
      setResizing(view, true);

      const onMove = (moveEvent: PointerEvent) => {
        const hit = view.posAtCoords({
          left: moveEvent.clientX,
          top: moveEvent.clientY,
        });
        if (!hit) return;
        const word = findWordAt(view.state.doc, hit.pos);
        const observation = findObservation(view.state.doc, id);
        if (!word || !observation) return;

        const first = observation.words[0];
        const last = observation.words[observation.words.length - 1];
        let { start, end } = observation.attrs;
        // almeno una parola: la maniglia non supera l'altro estremo
        if (type === "start") start = Math.min(word.start, last.start);
        else end = Math.max(word.end, first.end);

        if (start === observation.attrs.start && end === observation.attrs.end)
          return;

        editor.commands.setObservationRange({ id, start, end });
        changed = true;
        const range = getObservationRange(editor.state.doc, id);
        if (range) options.onRangeChange?.(range);
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
        view.dom.classList.remove(RESIZING_CLASS);
        setResizing(view, false);
        suppressClick = true;
        setTimeout(() => {
          suppressClick = false;
        }, 0);
        if (!changed) return;
        const range = getObservationRange(editor.state.doc, id);
        if (range) options.onRangeCommit?.(range);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
    };

    return [
      new Plugin<PluginState>({
        key: observationResizePluginKey,
        state: {
          init: () => ({
            editingId: null,
            isResizing: false,
            decorations: DecorationSet.empty,
          }),
          apply(tr, value) {
            const meta = tr.getMeta(observationResizePluginKey) ?? {};
            const editingId =
              "editingId" in meta ? meta.editingId : value.editingId;
            const isResizing =
              "isResizing" in meta ? meta.isResizing : value.isResizing;

            if (!tr.docChanged && editingId === value.editingId) {
              return isResizing === value.isResizing
                ? value
                : { ...value, isResizing };
            }

            return {
              editingId,
              isResizing,
              decorations: buildDecorations(tr.doc, editingId, onHandleDown),
            };
          },
        },
        props: {
          decorations(state) {
            return observationResizePluginKey.getState(state)?.decorations;
          },
          handleDOMEvents: {
            // il click sulle parole non evidenziate lo gestisce il plugin Word
            // (seek), che viene prima e restituisce true
            click: (view, event) => {
              if (suppressClick) return true;
              // fine di una selezione col mouse (creazione di una nuova
              // observation): non è un click su un'observation
              const selection = view.dom.ownerDocument.getSelection();
              if (selection && !selection.isCollapsed) return false;
              if (!(event.target instanceof Node)) return false;

              let pos: number;
              try {
                pos = view.posAtDOM(event.target, 0);
              } catch {
                return false;
              }
              const word = findWordAt(view.state.doc, pos);
              if (!word) return false;

              const { layers } = unwrapObservations(word.node);
              if (!layers.length) return false;

              options.onObservationClick?.({
                word: { start: word.start, end: word.end },
                observations: layers
                  .map(toObservationInfo)
                  .sort((a, b) => a.end - a.start - (b.end - b.start)),
              });
              return true;
            },
          },
        },
      }),
    ];
  },
});

export default ObservationResize;
